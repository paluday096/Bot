import { getStreak, getWeekDays, getTodayEntry } from '../utils/storage';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getMoodEmoji(mood) {
  const moods = { great: '😄', good: '🙂', okay: '😐', tough: '😔', awful: '😢' };
  return moods[mood] || '✏️';
}

export default function HomeScreen({ onWrite }) {
  const streak = getStreak();
  const weekDays = getWeekDays();
  const todayEntry = getTodayEntry();

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <div>
          <h1 className="greeting">{getGreeting()},</h1>
          <p className="greeting-sub">
            {todayEntry ? "You've written today ✓" : "Ready to reflect?"}
          </p>
        </div>
        <div className="streak-badge">
          <span className="streak-fire">🔥</span>
          <span className="streak-count">{streak}</span>
        </div>
      </header>

      <div className="week-tracker">
        {weekDays.map(day => (
          <div key={day.key} className={`week-day ${day.isToday ? 'today' : ''} ${day.isFuture ? 'future' : ''}`}>
            <div className={`day-dot ${day.completed ? 'completed' : ''} ${day.isToday && !day.completed ? 'pending-today' : ''}`}>
              {day.completed ? '✓' : day.isToday ? '·' : ''}
            </div>
            <span className="day-label">{day.label}</span>
            <span className="day-date">{day.date}</span>
          </div>
        ))}
      </div>

      <div className="home-cards">
        {todayEntry ? (
          <div className="entry-preview-card" onClick={onWrite}>
            <div className="entry-preview-top">
              <span className="entry-mood-emoji">{getMoodEmoji(todayEntry.mood)}</span>
              <span className="entry-preview-label">Today's entry</span>
              <span className="entry-edit-hint">Edit</span>
            </div>
            <p className="entry-preview-text">{todayEntry.text.slice(0, 120)}{todayEntry.text.length > 120 ? '…' : ''}</p>
          </div>
        ) : (
          <button className="write-card" onClick={onWrite}>
            <div className="write-card-left">
              <h2>Write Today's Entry</h2>
              <p>Capture how your day went</p>
            </div>
            <span className="write-card-icon">✏️</span>
          </button>
        )}

        <button className="reflect-card" onClick={onWrite}>
          <div className="reflect-card-left">
            <h2>Reflect</h2>
            <p>Look back on your journey</p>
          </div>
          <span className="reflect-card-icon">🌿</span>
        </button>
      </div>
    </div>
  );
}
