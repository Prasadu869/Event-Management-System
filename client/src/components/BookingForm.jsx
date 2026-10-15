import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';

function BookingForm({ eventId, onBookingSuccess }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Please log in first to book this event.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setSubmitting(true);
    try {
      await bookingService.bookEvent(eventId, { ticketCount, attendeeName });
      onBookingSuccess();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Primary Attendee Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Alex Morgan"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Number of Tickets</label>
        <select 
          className="form-input" 
          value={ticketCount} 
          onChange={(e) => setTicketCount(Number(e.target.value))}
          style={{ cursor: 'pointer' }}
        >
          <option value={1}>1 Ticket</option>
          <option value={2}>2 Tickets</option>
          <option value={3}>3 Tickets</option>
          <option value={4}>4 Tickets</option>
          <option value={5}>5 Tickets (Group)</option>
        </select>
      </div>

      {error && <div className="alert-message alert-error">{error}</div>}

      <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={submitting}>
        {submitting ? 'Confirming Ticket...' : '⚡ Reserve My Spot Now'}
      </button>

      {!token && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '0.75rem' }}>
          * Requires an active account. You'll be redirected to login.
        </p>
      )}
    </form>
  );
}

export default BookingForm;
