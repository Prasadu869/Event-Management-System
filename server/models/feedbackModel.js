import pool from './db.js';

const FeedbackModel = {
  createFeedback: async (userId, eventId, rating, comment) => {
    const [result] = await pool.execute(
      'INSERT INTO feedback (user_id, event_id, rating, comment) VALUES (?, ?, ?, ?)',
      [userId, eventId, rating, comment]
    );
    return result.insertId;
  },

  getFeedbackByEventId: async (eventId) => {
    const [rows] = await pool.execute(
      `SELECT f.id, f.rating, f.comment, f.created_at, u.username
       FROM feedback f
       JOIN users u ON f.user_id = u.id
       WHERE f.event_id = ?
       ORDER BY f.created_at DESC`,
      [eventId]
    );
    return rows;
  },

  getAllFeedback: async () => {
    const [rows] = await pool.execute(
      `SELECT f.id, f.rating, f.comment, f.created_at, u.username, u.email, e.title AS eventTitle
       FROM feedback f
       JOIN users u ON f.user_id = u.id
       JOIN events e ON f.event_id = e.id
       ORDER BY f.created_at DESC`
    );
    return rows;
  },
};

export default FeedbackModel;
