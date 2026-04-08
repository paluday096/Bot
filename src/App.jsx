import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import WriteScreen from './screens/WriteScreen';
import HistoryScreen from './screens/HistoryScreen';
import StreakScreen from './screens/StreakScreen';
import BottomNav from './components/BottomNav';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('home');
  const [writing, setWriting] = useState(false);
  const [refresh, setRefresh] = useState(0);

  function handleSaved() {
    setWriting(false);
    setTab('home');
    setRefresh(r => r + 1);
  }

  if (writing) {
    return (
      <div className="app-shell">
        <WriteScreen onBack={() => setWriting(false)} onSaved={handleSaved} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="screen-container">
        {tab === 'home' && (
          <HomeScreen key={refresh} onWrite={() => setWriting(true)} />
        )}
        {tab === 'history' && (
          <HistoryScreen onWriteToday={() => setWriting(true)} />
        )}
        {tab === 'streak' && (
          <StreakScreen />
        )}
      </div>
      <BottomNav active={tab} onNavigate={setTab} />
    </div>
  );
}
