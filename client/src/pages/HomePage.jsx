import React, { useEffect, useState, useMemo } from 'react';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';

// Fallback preview events in case server is starting up or database is connecting
const PREVIEW_EVENTS = [
  {
    id: 1,
    title: 'Global AI & Tech Expo 2026',
    description: 'Immerse yourself in cutting-edge developments in Artificial Intelligence, Quantum Computing, and Robotics.',
    location: 'Convention Center, Hall A, Tech District',
    date: '2026-11-15T09:30:00Z',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: 'Tech'
  },
  {
    id: 2,
    title: 'Neon Horizon Music Festival',
    description: 'A 2-day open-air music experience featuring international electronic and indie artists with mesmerizing light shows.',
    location: 'Starlight Amphitheater, Waterfront',
    date: '2026-11-20T17:00:00Z',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    category: 'Music'
  },
  {
    id: 3,
    title: 'International Culinary & Wine Summit',
    description: 'Savor gourmet creations, masterclasses led by Michelin chefs, and vintage pairings.',
    location: 'Grand Pavilion, Riverfront',
    date: '2026-11-28T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    category: 'Food'
  },
  {
    id: 4,
    title: 'NextGen Startup Pitch Night',
    description: 'Watch 15 disruptive startups pitch to top venture capitalists with VIP networking dinner.',
    location: 'Metropolitan Innovation Hub, Floor 14',
    date: '2026-12-05T18:00:00Z',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    category: 'Startup'
  },
  {
    id: 5,
    title: 'City Marathon & Wellness Fair',
    description: '5K, 10K, and Half Marathon categories followed by restorative yoga and nutrition booths.',
    location: 'City Central Park, North Gate',
    date: '2026-12-12T06:30:00Z',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
    category: 'Sports'
  },
  {
    id: 6,
    title: 'Modern Art & Design Biennale',
    description: 'Contemporary installations, digital generative art, sculpture, and interactive visual architecture.',
    location: 'Center for Modern Arts, Gallery 3',
    date: '2026-12-18T10:00:00Z',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=1200&q=80',
    category: 'Art'
  }
];

const CATEGORIES = ['All', 'Tech', 'Music', 'Food', 'Startup', 'Sports', 'Art'];

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventService.getAllEvents();
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
          setIsUsingFallback(false);
        } else {
          setEvents(PREVIEW_EVENTS);
          setIsUsingFallback(true);
        }
      } catch (error) {
        console.warn('API not reachable yet, displaying curated previews:', error.message);
        setEvents(PREVIEW_EVENTS);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'All' || 
        (event.category && event.category.toLowerCase() === selectedCategory.toLowerCase()) ||
        (event.title && event.title.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, selectedCategory]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">Explore Premier Events</h2>
        <p className="page-subtitle">Find and reserve your spot at upcoming conferences, festivals, and exhibitions.</p>
      </div>

      {isUsingFallback && (
        <div className="alert-message" style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#c7d2fe', marginBottom: '1.5rem' }}>
          💡 <strong>Tip:</strong> Showing curated events. When your MySQL database and backend are connected, live database events will load here automatically!
        </div>
      )}

      <div className="controls-bar">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search events by title, keyword, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-chips">
          {CATEGORIES.map(category => (
            <button
              key={category}
              className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
          <p>Loading upcoming events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            No events found matching "{searchQuery}".
          </p>
          <button className="btn-outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;