import React from 'react';
import './notificationPanel.css';
// import { IUserNotification } from './notification.ts';
import { notifications } from './sample-notifications.ts';

// Pass prop 'notification: IUserNotification' later
function NotificationObject({ title, description, notificationDate }) {
    const [checked, setChecked] = React.useState(false);

    // const notifications.map()

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <li className="notification-object">
            <div className="n-content">
                <span className="n-header">
                    <b>{title}</b><i> - {notificationDate}</i>
                </span>
                <div>Description</div>
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
                <span>Notifications</span>
                
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