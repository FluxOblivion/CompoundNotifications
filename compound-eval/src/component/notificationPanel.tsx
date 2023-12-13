import React, { useState, useEffect } from 'react';
import './notificationPanel.css';
import { IUserNotification } from './notification.ts';
import { notifications } from './sample-notifications.ts';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    // const year = (date.getFullYear() + 1).toString().padStart(2, '0');
  
    return `${hours}:${minutes} - ${day}/${month}`;
}

// Individual Notifications
// Trouble typing parameters; 'cannot be used as a JSX component?'
function NotificationObject({ id, title, description, notificationDate, readBy, onCheckBoxChange }) {
    const [checked, setChecked] = useState(false);
    const [read, setRead] = useState(false);

    useEffect(() => {
        // This will run every time a checkbox is changed
        // console.log(`checkbox ${id} has been changed to ${checked}`);
      }, [checked, id]);

    // Set checkbox state
    function onChecked() {
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
    const [unreadItems, setUnreadItems] = useState(notifications.length);

    const handleCheckboxChange = (id, checked) => {
        console.log('selected notification: ', id, ', ', checked);
        if (checked) {
            // Add checked item id to checkedItems list
            // Sort by id?
            const inList = checkedItems.find(item => item === id);
            if (!inList) {
                // console.log('adding checked item');
                // setCheckedItems(checkedItems.concat(id));
            }
            setCheckedItems(checkedItems.concat(id));
        } else {
            // Check if already in checkedItems list
            // If found, remove from list
            const inList = checkedItems.find(item => item === id);
            if (inList) {
                console.log('removing checked item');
                setCheckedItems(checkedItems.filter(item => item !== id));
            } 
        }
        console.log('checkedItems: ', checkedItems);
        // setChecked(!checked);
    };

    useEffect(() => {
        //...
    }, [listItems]);

    const checkAll = () => {
        // Need to check the opposite; since it's not checked yet
        // Need to set checkboxes in notificationObjects to true/false
        if (!checkedGlobal) {
            setCheckedGlobal(true);
            const listItemIds = listItems.map(({userNotificationId}) => userNotificationId);
            setCheckedItems(listItemIds);
        } else {
            setCheckedGlobal(false);
            setCheckedItems([]);
        }
        console.log('checkedItems: ', checkedItems);
    };

    const markRead = () => {
        // Mark selected notifications as read 
    };

    const markUnread = () => {
        // Mark selected notifications as unread
    };

    const markArchived = () => {
        // Mark selected notifications as archived
        // Make sure they're removed from the list!
    };

    return (
        <div className="notification-panel">
            <div className="p-header">
                <span>{unreadItems > 0
                    ? <b>Inbox ({unreadItems})</b>
                    : <i>Inbox ({unreadItems})</i>
                    }</span>
                <div className="filler" />
                {checkedItems.length > 0 &&
                    <div>
                        <button>Read</button>
                        <button>Unread</button>
                        <button>Archive</button>
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
                    />    
                ))}
            </ul>
        </div>
    );
}