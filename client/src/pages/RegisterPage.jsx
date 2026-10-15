import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await auth.register({ username, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 180px)' }}>
      <div className="glass-panel form-card">
        <div className="form-header">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
          <h2>Join EventPulse</h2>
          <p>Create an account to reserve tickets, submit reviews, and stay updated.</p>
        </div>

        {error && <div className="alert-message alert-error">{error}</div>}
        {success && <div className="alert-message alert-success">Account created successfully! Redirecting to login...</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name or Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="e.g. Jordan Hayes"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jordan@example.com"
            />
          </div>

          <div className="form-group">
            <label>Choose Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={submitting}>
            {submitting ? 'Creating Profile...' : 'Complete Registration →'}
          </button>
        </form>

        <div className="form-footer-link">
          Already registered? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
