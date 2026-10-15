import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 180px)' }}>
      <div className="glass-panel form-card">
        <div className="form-header">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
          <h2>Welcome Back</h2>
          <p>Sign in to manage bookings and explore exclusive events.</p>
        </div>

        {error && <div className="alert-message alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={submitting}>
            {submitting ? 'Authenticating...' : 'Sign In →'}
          </button>
        </form>

        {/* Demo Fill Buttons */}
        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '0.75rem' }}>
            ⚡ Quick Demo Accounts (One-Click Fill):
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              onClick={() => handleQuickDemo('admin@eventpulse.com', 'admin123')}
            >
              Fill Admin Creds
            </button>
            <button
              type="button"
              className="btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              onClick={() => handleQuickDemo('alex@eventpulse.com', 'demo123')}
            >
              Fill User Creds
            </button>
          </div>
        </div>

        <div className="form-footer-link">
          Don't have an account? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
