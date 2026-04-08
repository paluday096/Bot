import { useState, useEffect } from 'react';
import { saveEntry, getTodayEntry, getTodayKey } from '../utils/storage';

const MOODS = [
  { key: 'great', emoji: '😄', label: 'Great' },
  { key: 'good', emoji: '🙂', label: 'Good' },
  { key: 'okay', emoji: '😐', label: 'Okay' },
  { key: 'tough', emoji: '😔', label: 'Tough' },
  { key: 'awful', emoji: '😢', label: 'Awful' },
];

const PROMPTS = [
  "What's on your mind today?",
  "How did today make you feel?",
  "What was the highlight of your day?",
  "What are you grateful for today?",
  "What challenged you today?",
];

export default function WriteScreen({ onBack, onSaved }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState(null);
  const [saved, setSaved] = useState(false);
  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  useEffect(() => {
    const existing = getTodayEntry();
    if (existing) {
      setText(existing.text);
      setMood(existing.mood);
    }
  }, []);

  function handleSave() {
    if (!text.trim()) return;
    saveEntry({
      date: getTodayKey(),
      text: text.trim(),
      mood,
      savedAt: new Date().toISOString(),
    });
    setSaved(true);
    setTimeout(() => {
      onSaved();
    }, 800);
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="screen write-screen">
      <div className="write-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span className="write-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <button
          className={`save-btn ${text.trim() ? 'active' : ''} ${saved ? 'saved' : ''}`}
          onClick={handleSave}
          disabled={!text.trim() || saved}
        >
          {saved ? '✓ Saved' : 'Done'}
        </button>
      </div>

      <div className="mood-row">
        <p className="mood-label">How are you feeling?</p>
        <div className="mood-pills">
          {MOODS.map(m => (
            <button
              key={m.key}
              className={`mood-pill ${mood === m.key ? 'selected' : ''}`}
              onClick={() => setMood(mood === m.key ? null : m.key)}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="write-area">
        <textarea
          className="journal-textarea"
          placeholder={prompt}
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
        />
        <div className="word-count">{wordCount} {wordCount === 1 ? 'word' : 'words'}</div>
      </div>
    </div>
  );
}
