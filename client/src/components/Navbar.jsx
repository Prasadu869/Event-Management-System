import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-navbar">
      <Link to="/" className="brand-logo">
        <div className="brand-icon">⚡</div>
        <div className="brand-text">Event<span>Pulse</span></div>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/home" className={`nav-link ${isActive('/home') ? 'active' : ''}`}>
            Explore Events
          </Link>
        </li>
        <li>
          <Link to="/my-bookings" className={`nav-link ${isActive('/my-bookings') ? 'active' : ''}`}>
            My Bookings
          </Link>
        </li>
        <li>
          <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
            Admin
          </Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link to="/login" className="btn-outline" style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}>
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/register" className="btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}>
                Get Started
              </Link>
            </li>
          </>
        ) : (
          <li>
            <div className="user-profile-badge" title="Click to Logout" onClick={handleLogout}>
              <div className="avatar-circle">EP</div>
              <span className="user-name-label">Account</span>
              <button className="logout-icon-btn" aria-label="Logout">
                ✕
              </button>
            </div>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Navbar;
