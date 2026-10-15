import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import feedbackService from '../services/feedbackService';

function FeedbackForm({ eventId, rating = 5, onFeedbackSubmitted }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [comment, setComment] = useState('');
  const [currentRating, setCurrentRating] = useState(rating || 5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Please log in first to leave feedback.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setSubmitting(true);
    try {
      await feedbackService.submitFeedback(eventId, {
        rating: currentRating,
        comment: comment
      });
      onFeedbackSubmitted();
      setComment('');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to submit review. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div className="form-group">
        <label>Select Rating (1 to 5 Stars)</label>
        <div className="star-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= currentRating ? 'active' : ''}
              onClick={() => setCurrentRating(star)}
              title={`${star} Star${star > 1 ? 's' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Your Review & Impressions</label>
        <textarea
          className="form-input"
          rows="3"
          placeholder="Share your thoughts about this event, speaker sessions, organization..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      {error && <div className="alert-message alert-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Posting Review...' : 'Submit Verified Review'}
      </button>
    </form>
  );
}

export default FeedbackForm;
