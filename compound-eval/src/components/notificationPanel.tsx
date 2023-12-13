import React, { useState, useEffect } from 'react';
import './notificationPanel.css';
import { IUserNotification } from './notification.ts';
import { notifications } from '../utils/sample-notifications.ts';
import { formatDate } from '../utils/format-date.ts';

// Individual Notification
// Trouble typing parameters; 'cannot be used as a JSX component?'
function NotificationObject({ id, title, description, notificationDate, readBy, onCheckBoxChange, checkedItems }) {
    const [checked, setChecked] = useState(false);
    const [read, setRead] = useState(false);

    useEffect(() => {
        const itemList = [...checkedItems];
        if (itemList.find(item => item.id === id)) {
            setChecked(true);
        }
      }, [id, checked, checkedItems]);

    // Set checkbox state
    const onChecked = () => {
        setChecked(!checked);
        onCheckBoxChange(id, !checked);
    };

    const handleClick = () => {
        if (!read) {
            setRead(true);
        }
    }

    // Date needs a different format
    const formattedDate = formatDate(notificationDate);

    return (
        <li className={`notification-object ${read ? "read" : ""}`}>
            <div className="n-content" onClick={handleClick}>
                <div className="n-header">
                    {!read
                        ?  <b>{title}</b>
                        : <i>{title}</i>
                    }
                    <i>{formattedDate}</i>
                </div>
                <p>{description}</p>
                {readBy &&
                    <i>Seen by {readBy}</i>
                }
            </div>
            <div className="checkbox">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChecked}
                />
            </div>
        </li>
    );
}

// Notifications List
export default function NotificationPanel() {
    const [checkedGlobal, setCheckedGlobal] = useState(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [listItems, setListItems] = useState<IUserNotification[]>([...notifications]);
    const [unreadCount, setUnreadCount] = useState<number>(notifications.length);
    const [archivedItems, setArchivedItems] = useState<IUserNotification[]>([]);

    useEffect(() => {
        setUnreadCount(listItems.length);
    }, [listItems]);

    const handleCheckboxChange = (id, checked) => {
        // Check if it's already in the checkedList
        const inList = checkedItems.find(item => item === id);
        if (checked) {
            if (!inList) {
                setCheckedItems([...checkedItems, id]);
            }
        } else {
            if (inList) {
                setCheckedItems(checkedItems.filter(item => item !== id));
            } 
        }
    };

    const checkAll = () => {
        // Need to check the opposite; since it's not checked yet
        // Need to set checkboxes in notificationObjects to true/false
        //  useEffect could be used for this?
        if (!checkedGlobal) {
            setCheckedGlobal(true);
            const listItemIds = listItems.map(({userNotificationId}) => userNotificationId);
            setCheckedItems(listItemIds);
        } else {
            setCheckedGlobal(false);
            setCheckedItems([]);
        }
    };

    const markRead = () => {
        // Mark selected notifications as read 
    };

    const markUnread = () => {
        // Mark selected notifications as unread
    };

    const markArchived = () => {
        const itemsToArchive = checkedItems.map(id => listItems.filter(
            listItem => listItem.userNotificationId === id)[0]
        );
        setArchivedItems([
            ...archivedItems,
            ...itemsToArchive,
        ]);
        setListItems([
            ...listItems.filter(
                listItem => !checkedItems.find(
                    (checkItem) => checkItem === listItem.userNotificationId)
            ),
        ]);
        setCheckedItems([]);
    };

    return (
        <div className="notification-panel">
            <div className="p-header">
                <span>{unreadCount > 0
                    ? <b>Inbox ({unreadCount})</b>
                    : <i>Inbox ({unreadCount})</i>
                    }</span>
                <div className="filler" />
                {checkedItems.length > 0 &&
                    <div>
                        <button onClick={markRead}>Read</button>
                        <button onClick={markUnread}>Unread</button>
                        <button onClick={markArchived}>Archive</button>
                    </div>

                }
                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={checkedGlobal}
                        onChange={checkAll}
                    />
                </div>
            </div>
            <ul>
                {listItems.map((item, index) => (
                    <NotificationObject
                        id={item.userNotificationId}
                        key={index}
                        title={item.title}
                        description={item.description}
                        notificationDate={item.notificationDate}
                        readBy={item.readByUserName}
                        onCheckBoxChange={handleCheckboxChange}
                        checkedItems={checkedItems}
                    />    
                ))}
            </ul>
        </div>
    );
}