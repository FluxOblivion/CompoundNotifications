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
    const year = (date.getFullYear() + 1).toString().padStart(2, '0');
  
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

function NotificationObject({ title, description, notificationDate }) {
    const [checked, setChecked] = React.useState(false);

    const formattedDate = formatDate(notificationDate);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <li className="notification-object">
            <div className="n-content">
                <div className="n-header">
                    <b>{title}</b>
                    <i>{formattedDate}</i>
                </div>
                <div>{description}</div>
            </div>
            <div className="n-read">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
            </div>
        </li>
    );
}

export default function NotificationPanel() {
    const [value, setValue] = React.useState(0);

    console.log('sample notifications: ', notifications);

    const notificationList = notifications.map(item => 
        <NotificationObject
            key={item.userNotificationId}
            title={item.title}
            description={item.description}
            notificationDate={item.notificationDate}
        />    
    );

    // Temporary fill
    const itemsUnread = notificationList.length;


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [checked, setChecked] = React.useState(false);

    const markAllRead = () => {
        setChecked(!checked);
    };

    return (
        <div className="notification-panel">
            <div className="p-header">
                <span>Inbox ({itemsUnread})</span>
                
            </div>
            {/* <div className="p-read">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={markAllRead}
                />
            </div> */}
            <hr />
            <ul>
                {notificationList}
            </ul>
        </div>
    );
}