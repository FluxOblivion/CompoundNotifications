import React, { useState, useEffect } from 'react';
import './notificationPanel.css';
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
function NotificationObject({ id, title, description, notificationDate, readBy, onCheckBoxChange }) {
    const [checked, setChecked] = useState(false);
    const [read, setRead] = useState(false);

    useEffect(() => {
        // This will run every time a checkbox is changed
        console.log(`checkbox ${id} has been changed to ${checked}`);
      }, [checked, id]);

    // Set checkbox state
    function onChecked() {
        setChecked(!checked);
        onCheckBoxChange(id, checked);
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
    const [checkedItems, setCheckedItems] = useState([]);
    const [listItems, setListItems] = useState([...notifications]);
    const [unreadItems, setUnreadItems] = useState(notifications.length);

    const handleCheckboxChange = (id, checked) => {
        console.log('selected notification: ', id);
        if (checked) {
            // Add checked item id to checkedItems list
            // setCheckedItems([...checkedItems, id]);
        } else {
            // Check if already in checkedItems list
            // If found, remove from list
        }
        // setChecked(!checked);
    };

    useEffect(() => {
        //...
    }, [listItems]);

    const checkAll = () => {
        // Look at check state of global checkbox
        // If true, check and add all items to checkedItems and set checkedGlobal to true
        // If false, remove all items from checkedItems and set checkedGlobal to false
        setCheckedGlobal(!checkedGlobal);
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