import React, { useEffect, useState } from 'react';
import api from '../services/api';
import eventService from '../services/eventService';

const DEMO_EVENTS = [
  { id: 1, title: 'Global AI & Tech Expo 2026', location: 'Convention Center, Hall A', date: '2026-11-15T09:30:00Z' },
  { id: 2, title: 'Neon Horizon Music Festival', location: 'Starlight Amphitheater', date: '2026-11-20T17:00:00Z' },
  { id: 3, title: 'International Culinary & Wine Summit', location: 'Grand Pavilion', date: '2026-11-28T11:00:00Z' },
  { id: 4, title: 'NextGen Startup Pitch Night', location: 'Metropolitan Innovation Hub', date: '2026-12-05T18:00:00Z' }
];

const DEMO_BOOKINGS = [
  { id: 1, username: 'AlexRivers', email: 'alex@eventpulse.com', eventTitle: 'Global AI & Tech Expo 2026', booking_date: '2026-10-10' },
  { id: 2, username: 'SarahChen', email: 'sarah@example.com', eventTitle: 'Neon Horizon Music Festival', booking_date: '2026-10-12' },
  { id: 3, username: 'DavidMiller', email: 'david@example.com', eventTitle: 'International Culinary & Wine Summit', booking_date: '2026-10-14' }
];

const DEMO_FEEDBACK = [
  { id: 1, username: 'AlexRivers', eventTitle: 'Global AI & Tech Expo 2026', rating: 5, comment: 'Incredible speakers and flawless organization.' },
  { id: 2, username: 'SarahChen', eventTitle: 'Neon Horizon Music Festival', rating: 4, comment: 'Great music lineup and energetic vibes.' }
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState(DEMO_EVENTS);
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);
  const [feedback, setFeedback] = useState(DEMO_FEEDBACK);
  const [loading, setLoading] = useState(true);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image_url: ''
  });
  const [formMsg, setFormMsg] = useState('');

  const loadAdminData = async () => {
    try {
      const eventsRes = await eventService.getAllEvents();
      if (Array.isArray(eventsRes) && eventsRes.length > 0) {
        setEvents(eventsRes);
      }
    } catch (e) {
      // Fallback to demo
    }

    try {
      const bookingsRes = await api.get('/admin/bookings');
      if (Array.isArray(bookingsRes.data) && bookingsRes.data.length > 0) {
        setBookings(bookingsRes.data);
      }
    } catch (e) {
      // Fallback to demo
    }

    try {
      const feedbackRes = await api.get('/admin/feedback');
      if (Array.isArray(feedbackRes.data) && feedbackRes.data.length > 0) {
        setFeedback(feedbackRes.data);
      }
    } catch (e) {
      // Fallback to demo
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event? All associated bookings will be removed.')) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(prev => prev.filter(e => e.id !== id));
      alert('Event deleted successfully.');
    } catch (err) {
      // Optimistic delete for demo
      setEvents(prev => prev.filter(e => e.id !== id));
      alert('Event removed.');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setFormMsg('');

    try {
      const res = await api.post('/events', newEvent);
      const createdId = res.data?.id || Date.now();
      setEvents(prev => [...prev, { ...newEvent, id: createdId }]);
      setFormMsg('Event published successfully!');
      setNewEvent({ title: '', description: '', location: '', date: '', image_url: '' });
      setTimeout(() => setActiveTab('events'), 1200);
    } catch (err) {
      // Optimistic addition for demo
      setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
      setFormMsg('Event added to dashboard view.');
      setNewEvent({ title: '', description: '', location: '', date: '', image_url: '' });
      setTimeout(() => setActiveTab('events'), 1200);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Admin Management Portal</h2>
        <p className="page-subtitle">Real-time control center for events, bookings, and attendee feedback.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            📅
          </div>
          <div>
            <div className="stat-number">{events.length}</div>
            <div className="stat-label">Active Events</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            🎟️
          </div>
          <div>
            <div className="stat-number">{bookings.length}</div>
            <div className="stat-label">Total Reservations</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            ⭐
          </div>
          <div>
            <div className="stat-number">{feedback.length}</div>
            <div className="stat-label">Reviews Received</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
            🛡️
          </div>
          <div>
            <div className="stat-number">Active</div>
            <div className="stat-label">System Status</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events List ({events.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          + Add New Event
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          Attendee Feedback ({feedback.length})
        </button>
      </div>

      {/* Tab: Events Management */}
      {activeTab === 'events' && (
        <div className="glass-panel bookings-table-wrapper">
          <table className="pulse-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td style={{ color: 'var(--text-dim)' }}>#{e.id}</td>
                  <td style={{ fontWeight: 600 }}>{e.title}</td>
                  <td>{e.location}</td>
                  <td>{e.date ? new Date(e.date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button className="btn-danger-outline" onClick={() => handleDeleteEvent(e.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Create Event Form */}
      {activeTab === 'create' && (
        <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '650px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Publish a New Event
          </h3>

          {formMsg && <div className="alert-message alert-success">{formMsg}</div>}

          <form onSubmit={handleCreateEvent}>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. World Robotics Championship 2026"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-input"
                rows="3"
                required
                placeholder="Full event overview, itinerary, and speaker information..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Venue / Location</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Silicon Convention Arena, Austin TX"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Event Date & Time</label>
              <input
                type="datetime-local"
                className="form-input"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Cover Image URL (Optional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/..."
                value={newEvent.image_url}
                onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Publish Event Live →
            </button>
          </form>
        </div>
      )}

      {/* Tab: All Bookings */}
      {activeTab === 'bookings' && (
        <div className="glass-panel bookings-table-wrapper">
          <table className="pulse-table">
            <thead>
              <tr>
                <th>Booking #</th>
                <th>Attendee</th>
                <th>Email</th>
                <th>Event Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ color: 'var(--primary-light)' }}>#EP-{b.id}</td>
                  <td style={{ fontWeight: 600 }}>{b.username || 'Attendee'}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{b.email || 'N/A'}</td>
                  <td>{b.eventTitle}</td>
                  <td>{b.booking_date ? new Date(b.booking_date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <span className="status-badge status-confirmed">Confirmed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: All Feedback */}
      {activeTab === 'feedback' && (
        <div className="glass-panel bookings-table-wrapper">
          <table className="pulse-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Event</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((f) => (
                <tr key={f.id}>
                  <td style={{ fontWeight: 600 }}>{f.username || 'User'}</td>
                  <td>{f.eventTitle || 'Event'}</td>
                  <td style={{ color: 'var(--accent-amber)' }}>
                    {'★'.repeat(f.rating || 5)} ({f.rating || 5}/5)
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{f.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
