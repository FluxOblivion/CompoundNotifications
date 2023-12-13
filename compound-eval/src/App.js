import './App.css';
import NotificationPanel from './component/notificationPanel.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Notification Centre
      </header>
      <div className="App-body">
        <NotificationPanel />
      </div>
    </div>
  );
}

export default App;
