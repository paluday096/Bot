export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Home</span>
      </button>
      <button
        className={`nav-item ${active === 'history' ? 'active' : ''}`}
        onClick={() => onNavigate('history')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>History</span>
      </button>
      <button
        className={`nav-item ${active === 'streak' ? 'active' : ''}`}
        onClick={() => onNavigate('streak')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Profile</span>
      </button>
    </nav>
  );
}
