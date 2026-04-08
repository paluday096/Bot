import { getStreak, getEntries, getWeekDays } from '../utils/storage';

function getLongestStreak(entries) {
  if (!entries.length) return 0;
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 1, current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].date);
    const curr = new Date(sorted[i].date);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

function getCalendarDays(year, month, entryDates) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const cells = [];

  for (let i = 0; i < (firstDay + 6) % 7; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({
      d,
      key,
      written: entryDates.has(key),
      isToday: today.getFullYear() === year && today.getMonth() === month && today.getDate() === d,
    });
  }
  return cells;
}

export default function StreakScreen() {
  const streak = getStreak();
  const entries = getEntries();
  const longest = getLongestStreak(entries);
  const entryDates = new Set(entries.map(e => e.date));

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const days = getCalendarDays(year, month, entryDates);
  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="screen streak-screen">
      <h2 className="screen-title">Your Streak</h2>

      <div className="streak-hero">
        <span className="streak-hero-fire">🔥</span>
        <span className="streak-hero-number">{streak}</span>
        <p className="streak-hero-label">day{streak !== 1 ? 's' : ''} in a row</p>
      </div>

      <div className="streak-stats">
        <div className="stat-card">
          <span className="stat-value">{entries.length}</span>
          <span className="stat-label">Total Entries</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{longest}</span>
          <span className="stat-label">Longest Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">Current Streak</span>
        </div>
      </div>

      <div className="calendar">
        <p className="calendar-month">{monthName}</p>
        <div className="calendar-grid">
          {DAY_LABELS.map(l => (
            <div key={l} className="cal-header">{l}</div>
          ))}
          {days.map((cell, i) =>
            cell === null ? (
              <div key={`empty-${i}`} className="cal-cell empty" />
            ) : (
              <div
                key={cell.key}
                className={`cal-cell ${cell.written ? 'written' : ''} ${cell.isToday ? 'cal-today' : ''}`}
              >
                {cell.d}
              </div>
            )
          )}
        </div>
      </div>

      {streak === 0 && (
        <p className="streak-nudge">Write your first entry to start a streak!</p>
      )}
    </div>
  );
}
