import React from 'react';
import './notificationPanel.css';
// import { IUserNotification } from './notification.ts';

// Pass prop 'notification: IUserNotification' later
function NotificationObject(read) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <li className="notification-object">
            <div className="n-content">
                <span className="n-header">
                    <b>Title</b><i> - Date</i>
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [checked, setChecked] = React.useState(false);

    const markAllRead = () => {
        setChecked(!checked);
    };

    return (
        <ul className="notification-panel">
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
            <div>
                <NotificationObject />
                <NotificationObject />
            </div>
        </ul>
    );
}