import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const createEvent = async (req, res, next) => {
  try {
    const { title, dateTime, location, capacity } = req.body;
    if (!title || !dateTime || !location || !capacity) {
      return next(new ApiError(400, "All fields are required"));
    }

    if (capacity < 0) {
      return next(new ApiError(400, "Capicity should be positive"));
    }

    if (capacity > 1000) {
      return next(
        new ApiError(400, "Capicity should be less than or equal 1000")
      );
    }

    const event = await Event.create({ title, dateTime, capacity, location });
    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          { eventId: event._id },
          "Event created successfully"
        )
      );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getEventDetails = async (req, res, next) => {
  try {
    const events = await Event.find({}).populate("registrations");
    return res
      .status(200)
      .json(new ApiResponse(true, { events }, "Events fetched successfully"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
      return next(new ApiError(400, "Both fields are required"));
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return next(
        new ApiError(400, `Event with id:${eventId} does not exists`)
      );
    }

    let userId;
    const exists = await User.findOne({ email });
    if (exists) {
      userId = exists._id;
    } else {
      const user = await User.create({ name, email });
      userId = user._id;
    }

    // if user is already registered
    if (event.registrations.includes(userId)) {
      return next(new ApiError(400, "User already registered"));
    }

    // checking capicity limit
    if (event.registrations.length >= event.capacity) {
      return next(new ApiError(400, "Event is full"));
    }
    event.registrations.push(userId);
    await event.save();
    return res
      .status(201)
      .json(new ApiResponse(true, {}, "User registered successfully"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listUpcomingEvent = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getEventStats = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};
