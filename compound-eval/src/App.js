import './App.css';
import NotificationPanel from './component/notificationPanel.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Notification Centre
      </header>
      <div className="App-body">
      <i>NOTE: This page will only display notifications from the last 60 days.</i>
        <NotificationPanel />
      </div>
    </div>
  );
}

export default App;
