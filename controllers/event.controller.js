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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const registerForEvent = async (req, res, next) => {
  try {
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
