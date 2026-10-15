import React from 'react';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p className="footer-brand">⚡ <span>EventPulse</span> — Modern Event Experience Platform</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} EventPulse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
