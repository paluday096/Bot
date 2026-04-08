import { useState } from 'react';
import { getEntries } from '../utils/storage';

const MOOD_MAP = {
  great: { emoji: '😄', color: '#22c55e' },
  good: { emoji: '🙂', color: '#3b82f6' },
  okay: { emoji: '😐', color: '#f59e0b' },
  tough: { emoji: '😔', color: '#f97316' },
  awful: { emoji: '😢', color: '#ef4444' },
};

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateStr === today.toISOString().split('T')[0]) return 'Today';
  if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function HistoryScreen({ onWriteToday }) {
  const entries = getEntries();
  const [expanded, setExpanded] = useState(null);

  if (!entries.length) {
    return (
      <div className="screen history-screen">
        <h2 className="screen-title">Past Entries</h2>
        <div className="empty-state">
          <span className="empty-icon">📖</span>
          <p>No entries yet.</p>
          <p>Start writing to build your journal.</p>
          <button className="cta-btn" onClick={onWriteToday}>Write Today's Entry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen history-screen">
      <h2 className="screen-title">Past Entries</h2>
      <p className="history-count">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
      <div className="entries-list">
        {entries.map(entry => {
          const mood = MOOD_MAP[entry.mood];
          const isOpen = expanded === entry.date;
          return (
            <div
              key={entry.date}
              className={`entry-item ${isOpen ? 'open' : ''}`}
              onClick={() => setExpanded(isOpen ? null : entry.date)}
            >
              <div className="entry-item-header">
                <div className="entry-item-left">
                  {mood && (
                    <span
                      className="entry-mood-dot"
                      style={{ background: mood.color + '22', color: mood.color }}
                    >
                      {mood.emoji}
                    </span>
                  )}
                  <div>
                    <p className="entry-item-date">{formatDate(entry.date)}</p>
                    {!isOpen && (
                      <p className="entry-item-preview">{entry.text.slice(0, 60)}{entry.text.length > 60 ? '…' : ''}</p>
                    )}
                  </div>
                </div>
                <span className="entry-chevron">{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <p className="entry-item-full">{entry.text}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
