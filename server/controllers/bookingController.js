import BookingModel from '../models/bookingModel.js';

export const createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    const bookingId = await BookingModel.createBooking(userId, eventId);
    res.status(201).json({ bookingId, message: 'Booking confirmed successfully!' });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookings = await BookingModel.getBookingsByUserId(userId);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    await BookingModel.deleteBooking(bookingId);
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    next(error);
  }
};
