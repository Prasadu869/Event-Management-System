import EventModel from '../models/eventModel.js';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await EventModel.getAllEvents();

    const formattedEvents = events.map(event => ({
      ...event,
      image: event.image_url || event.image || DEFAULT_IMAGE
    }));

    res.json(formattedEvents);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await EventModel.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const formattedEvent = {
      ...event,
      image: event.image_url || event.image || DEFAULT_IMAGE
    };
    res.json(formattedEvent);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const eventId = await EventModel.createEvent(req.body);
    res.status(201).json({ id: eventId, message: 'Event created successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    await EventModel.updateEvent(req.params.id, req.body);
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    await EventModel.deleteEvent(req.params.id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
