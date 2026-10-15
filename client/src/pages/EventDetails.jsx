import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import FeedbackForm from '../components/FeedbackForm';
import eventService from '../services/eventService';
import feedbackService from '../services/feedbackService';

const FALLBACK_EVENTS = [
  {
    id: 1,
    title: 'Global AI & Tech Expo 2026',
    description: 'Immerse yourself in cutting-edge developments in Artificial Intelligence, Quantum Computing, and Robotics featuring keynotes from industry pioneers. Enjoy hands-on hardware exhibits and high-impact networking with tech founders.',
    location: 'Convention Center, Hall A, Tech District',
    date: '2026-11-15T09:30:00Z',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech'
  },
  {
    id: 2,
    title: 'Neon Horizon Music Festival',
    description: 'A 2-day open-air music experience featuring international electronic, indie, and alternative artists with mesmerizing light shows and food trucks.',
    location: 'Starlight Amphitheater, Waterfront',
    date: '2026-11-20T17:00:00Z',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    category: 'Music'
  },
  {
    id: 3,
    title: 'International Culinary & Wine Summit',
    description: 'Savor gourmet creations, participate in masterclasses led by Michelin-star chefs, and discover exquisite vintage pairings from renowned vineyards.',
    location: 'Grand Pavilion, Riverfront',
    date: '2026-11-28T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    category: 'Food'
  }
];

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const fetchEventData = async () => {
    try {
      const data = await eventService.getEventById(id);
      if (data) {
        setEvent(data);
      }
    } catch (error) {
      console.warn('Backend event not found, checking previews:', error.message);
      const fallback = FALLBACK_EVENTS.find(e => String(e.id) === String(id)) || FALLBACK_EVENTS[0];
      setEvent(fallback);
    }

    try {
      const fb = await feedbackService.getEventFeedback(id);
      if (Array.isArray(fb)) {
        setReviews(fb);
      }
    } catch (err) {
      // Mock reviews if server not connected
      setReviews([
        { id: 1, username: 'Elena Rostova', rating: 5, comment: 'Phenomenal organization and brilliant speaker lineup!', created_at: '2026-10-14' },
        { id: 2, username: 'Marcus Vance', rating: 4, comment: 'Loved the exhibition booths and networking opportunities.', created_at: '2026-10-13' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading event experience...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Event not found</h2>
        <Link to="/home" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
          Back to Events
        </Link>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
  const eventImg = event.image || event.image_url || defaultImage;

  return (
    <div className="event-details-layout">
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/home" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          ← Back to all events
        </Link>
      </div>

      {/* Hero Media Banner */}
      <div className="event-details-hero">
        <img src={eventImg} alt={event.title} />
        <div className="event-hero-gradient">
          <div className="event-badge-floating" style={{ position: 'static', alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
            Confirmed Event
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.2 }}>
            {event.title}
          </h1>
        </div>
      </div>

      {/* Two Column Layout: Main Content vs Booking Sidebar */}
      <div className="details-grid">
        {/* Left Column: Event Specs & Reviews */}
        <div className="glass-panel details-content-card">
          <div className="details-meta-row">
            <div className="meta-item">
              <strong>Event Date & Time</strong>
              <span>📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="meta-item">
              <strong>Venue & Location</strong>
              <span>📍 {event.location}</span>
            </div>
          </div>

          <h3>About This Event</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            {event.description}
          </p>

          {/* Attendee Reviews Section */}
          <div className="reviews-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0 }}>Attendee Feedback ({reviews.length})</h3>
            </div>

            {reviews.length === 0 ? (
              <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="review-item">
                  <div className="review-header">
                    <strong>{rev.username || 'Verified Attendee'}</strong>
                    <div className="star-rating-display">
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Reservation & Feedback Action Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Reservation Card */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Reserve Your Spot
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Immediate digital confirmation. No hidden convenience fees.
            </p>

            {bookingSuccess ? (
              <div className="alert-message alert-success">
                🎉 <strong>Reservation Confirmed!</strong> Your ticket has been registered. You can view it in <Link to="/my-bookings" style={{ textDecoration: 'underline' }}>My Bookings</Link>.
              </div>
            ) : (
              <BookingForm eventId={event.id} onBookingSuccess={() => setBookingSuccess(true)} />
            )}
          </div>

          {/* Feedback Card */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Share Your Thoughts
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Attended this event? Leave a rating to help others.
            </p>

            {feedbackSuccess ? (
              <div className="alert-message alert-success" style={{ marginTop: '1rem' }}>
                🙌 <strong>Thank You!</strong> Your review was submitted.
              </div>
            ) : (
              <FeedbackForm
                eventId={event.id}
                onFeedbackSubmitted={() => {
                  setFeedbackSuccess(true);
                  fetchEventData();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
