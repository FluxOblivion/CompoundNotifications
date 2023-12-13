import React from 'react';
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
function NotificationObject({ title, description, notificationDate, readBy }) {
    const [checked, setChecked] = React.useState(false);
    
    const formattedDate = formatDate(notificationDate);

    const handleChecked = () => {
        setChecked(!checked);
    };

    return (
        <li className="notification-object">
            <div className="n-content">
                <div className="n-header">
                    <b>{title}</b>
                    <i>{formattedDate}</i>
                </div>
                <p>{description}</p>
                {readBy &&
                    <i>Seen by {readBy}</i>
                }
            </div>
            <div className="n-read">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChecked}
                />
            </div>
        </li>
    );
}

// Notifications List
export default function NotificationPanel() {
    const [checked, setChecked] = React.useState(false);

    const notificationList = notifications.map(item => 
        <NotificationObject
            key={item.userNotificationId}
            title={item.title}
            description={item.description}
            notificationDate={item.notificationDate}
            readBy={item.readByUserName}
        />    
    );

    // Temporary fill
    const itemsUnread = notificationList.length;


    const handleChecked = () => {
        setChecked(!checked);
    };

    const markAllRead = () => {
        setChecked(!checked);
    };

    return (
        <div className="notification-panel">
            <div className="p-header">
                <span>Inbox ({itemsUnread})</span>
                <div className="filler" />
                <div className="n-read">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChecked}
                    />
                </div>
            </div>
            <ul>
                {notificationList}
            </ul>
        </div>
    );
}