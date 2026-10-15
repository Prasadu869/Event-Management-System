import React from 'react';
import { useNavigate } from 'react-router-dom';

function EventCard({ event }) {
  const navigate = useNavigate();

  const formattedDate = event.date 
    ? new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Date TBA';

  const defaultImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="event-card" onClick={() => navigate(`/event/${event.id}`)} style={{ cursor: 'pointer' }}>
      <div className="event-card-media">
        <img
          src={event.image || event.image_url || defaultImage}
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="event-badge-floating">
          Featured
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-date-tag">
          <span>📅</span> {formattedDate}
        </div>

        <h3 className="event-card-title">{event.title}</h3>

        <p className="event-card-desc">
          {event.description || 'Join us for this exclusive event featuring world-class sessions, networking, and experiences.'}
        </p>

        <div className="event-card-footer">
          <div className="event-location-text" title={event.location}>
            <span>📍</span> {event.location || 'Location details inside'}
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/event/${event.id}`);
            }}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
