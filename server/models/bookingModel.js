import pool from './db.js';

const BookingModel = {
  createBooking: async (userId, eventId) => {
    const [result] = await pool.execute(
      'INSERT INTO bookings (user_id, event_id) VALUES (?, ?)',
      [userId, eventId]
    );
    return result.insertId;
  },

  getBookingsByUserId: async (userId) => {
    const [rows] = await pool.execute(
      `SELECT b.id, b.booking_date, e.title AS eventTitle, e.location, e.date AS eventDate, e.image_url AS image
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC`,
      [userId]
    );
    return rows;
  },

  getAllBookings: async () => {
    const [rows] = await pool.execute(
      `SELECT b.id, b.booking_date, u.username, u.email, e.title AS eventTitle, e.date AS eventDate
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN events e ON b.event_id = e.id
       ORDER BY b.booking_date DESC`
    );
    return rows;
  },

  deleteBooking: async (bookingId) => {
    await pool.execute('DELETE FROM bookings WHERE id = ?', [bookingId]);
  },
};

export default BookingModel;
