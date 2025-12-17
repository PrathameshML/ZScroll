import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './bottom-nav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="nav-inner">
        <button className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/') }>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Home</span>
        </button>

        <button className={`nav-btn ${location.pathname === '/saved' ? 'active' : ''}`} onClick={() => navigate('/saved') }>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3h12v18l-6-3-6 3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>Saved</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
