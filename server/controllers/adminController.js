import EventModel from '../models/eventModel.js';
import BookingModel from '../models/bookingModel.js';
import FeedbackModel from '../models/feedbackModel.js';

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await EventModel.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await BookingModel.getAllBookings();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const feedbackList = await FeedbackModel.getAllFeedback();
    res.json(feedbackList);
  } catch (error) {
    next(error);
  }
};
