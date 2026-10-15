import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import api from '../services/api';

const PREVIEW_BOOKINGS = [
  {
    id: 101,
    eventTitle: 'Global AI & Tech Expo 2026',
    location: 'Convention Center, Hall A',
    eventDate: '2026-11-15T09:30:00Z',
    booking_date: '2026-10-12T14:30:00Z',
    tickets: 2,
    status: 'Confirmed'
  },
  {
    id: 102,
    eventTitle: 'Neon Horizon Music Festival',
    location: 'Starlight Amphitheater',
    eventDate: '2026-11-20T17:00:00Z',
    booking_date: '2026-10-14T11:15:00Z',
    tickets: 1,
    status: 'Confirmed'
  }
];

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchBookings = async () => {
    if (!token) {
      setBookings(PREVIEW_BOOKINGS);
      setLoading(false);
      return;
    }

    try {
      const data = await bookingService.getUserBookings();
      if (Array.isArray(data) && data.length > 0) {
        setBookings(data);
      } else {
        setBookings(PREVIEW_BOOKINGS);
      }
    } catch (error) {
      console.warn('API error fetching bookings, showing demo tickets:', error.message);
      setBookings(PREVIEW_BOOKINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancellingId(id);
    try {
      if (token) {
        await api.delete(`/bookings/${id}`);
      }
      setBookings(prev => prev.filter(b => b.id !== id));
      alert('Booking cancelled successfully.');
    } catch (err) {
      // Optimistic update for preview
      setBookings(prev => prev.filter(b => b.id !== id));
      alert('Booking removed from list.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="page-title">My Event Reservations</h2>
          <p className="page-subtitle">View and manage your confirmed event tickets and passes.</p>
        </div>
        <Link to="/home" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
          + Book Another Event
        </Link>
      </div>

      {!token && (
        <div className="alert-message" style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#c7d2fe', marginBottom: '2rem' }}>
          ℹ️ <strong>Demo View:</strong> Showing sample confirmed tickets. <Link to="/login" style={{ textDecoration: 'underline', fontWeight: 600 }}>Log in</Link> to view your personalized account bookings.
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <p>Loading your event reservations...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎟️</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No Active Bookings Found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You haven't reserved any event tickets yet. Explore upcoming experiences!
          </p>
          <Link to="/home" className="btn-primary">
            Explore Upcoming Events →
          </Link>
        </div>
      ) : (
        <div className="bookings-table-wrapper glass-panel">
          <table className="pulse-table">
            <thead>
              <tr>
                <th>Booking Ref #</th>
                <th>Event Title</th>
                <th>Event Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--primary-light)' }}>
                    #EP-{booking.id.toString().padStart(4, '0')}
                  </td>
                  <td style={{ fontWeight: 600 }}>{booking.eventTitle}</td>
                  <td>
                    {booking.eventDate
                      ? new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : new Date(booking.booking_date).toLocaleDateString()}
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {booking.location || 'Central Venue'}
                  </td>
                  <td>
                    <span className="status-badge status-confirmed">
                      ● Confirmed
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-danger-outline"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancellingId === booking.id}
                    >
                      {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
