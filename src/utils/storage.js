const ENTRIES_KEY = 'journal_entries';

export function getEntries() {
  try {
    return JSON.parse(localStorage.getItem(ENTRIES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveEntry(entry) {
  const entries = getEntries();
  const today = getTodayKey();
  const existing = entries.findIndex(e => e.date === today);
  if (existing >= 0) {
    entries[existing] = entry;
  } else {
    entries.unshift(entry);
  }
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getTodayEntry() {
  const today = getTodayKey();
  return getEntries().find(e => e.date === today) || null;
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export function getStreak() {
  const entries = getEntries();
  if (!entries.length) return 0;

  const entryDates = new Set(entries.map(e => e.date));
  let streak = 0;
  const cursor = new Date();

  // If today not written yet, start from yesterday
  const todayKey = getTodayKey();
  if (!entryDates.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = cursor.toISOString().split('T')[0];
    if (entryDates.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getWeekDays() {
  const entryDates = new Set(getEntries().map(e => e.date));
  const days = [];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sun
  // Start from Monday of current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = d.toISOString().split('T')[0];
    days.push({
      key,
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      completed: entryDates.has(key),
      isToday: key === getTodayKey(),
      isFuture: d > today,
    });
  }
  return days;
}
