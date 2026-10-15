import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper">
      <div className="hero-glow-sphere"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span>✨</span> Discover, Book & Experience Premier Events
        </div>

        <h1 className="hero-title">
          Unforgettable Moments, <br />
          <span className="gradient-text">Seamlessly Managed.</span>
        </h1>

        <p className="hero-subtitle">
          From cutting-edge tech expos and electric music festivals to gourmet culinary summits.
          Book your tickets in seconds with verified confirmation.
        </p>

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={() => navigate('/home')} style={{ padding: '0.85rem 2.2rem', fontSize: '1.05rem' }}>
            Explore Upcoming Events →
          </button>
          <button className="btn-outline" onClick={() => navigate('/login')} style={{ padding: '0.85rem 1.8rem', fontSize: '1.05rem' }}>
            Account Login
          </button>
        </div>

        <div className="hero-features">
          <div className="feature-pill">
            <div className="icon">🎟️</div>
            <h4>Instant Booking</h4>
            <p>Direct ticket reservations with immediate confirmation and digital tracking.</p>
          </div>

          <div className="feature-pill">
            <div className="icon">⭐</div>
            <h4>Real-time Feedback</h4>
            <p>Verified reviews and dynamic star ratings from genuine event attendees.</p>
          </div>

          <div className="feature-pill">
            <div className="icon">⚡</div>
            <h4>Curated Lineups</h4>
            <p>Hand-picked conferences, music festivals, culinary summits, and expos.</p>
          </div>

          <div className="feature-pill">
            <div className="icon">🛡️</div>
            <h4>Admin Command</h4>
            <p>Centralized control panel for event creation, live bookings, and review moderation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
