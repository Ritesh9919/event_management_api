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

    // if event is passed
    const todayDate = new Date();
    if (new Date(event.dateTime) < todayDate) {
      return next(new ApiError(400, "Event is passed, You can't register"));
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
    const { eventId, userId } = req.query;
    const event = await Event.findById(eventId);
    if (!event) {
      return next(new ApiError(404, "Event not found"));
    }

    // if event is passed
    const todayDate = new Date();
    if (new Date(event.dateTime) < todayDate) {
      return next(new ApiError(400, "Event is passed, You can't cancel"));
    }

    // checking if user is registered
    const index = event.registrations.findIndex((id) => id.equals(userId));
    if (index === -1) {
      return next(new ApiError(400, "User is not registered for event"));
    }

    event.registrations.splice(index, 1);
    await event.save();
    return res
      .status(200)
      .json(new ApiResponse(true, {}, "User registration canceled for event"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listUpcomingEvent = async (req, res, next) => {
  try {
    const todayDate = new Date();
    const upcomingEvents = await Event.find({ dateTime: { $gt: todayDate } })
      .sort({
        dateTime: 1,
        "location.city": 1,
        "location.country": 1,
      })
      .select("-__v")
      .lean();
    if (!upcomingEvents.length) {
      return next(new ApiError(404, "No upcoming event found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          { events: upcomingEvents },
          "Upcoming events fetched successfully"
        )
      );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getEventStats = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return next(new ApiError(404, "Event not found"));
    }

    const totalRegistration = event.registrations.length;
    const remainingCapicity = event.capacity - totalRegistration;
    const percentageOfCapicityUsed = (totalRegistration / event.capacity) * 100;

    return res.status(200).json(
      new ApiResponse(
        true,
        {
          totalRegistration,
          remainingCapicity,
          percentageOfCapicityUsed: `${percentageOfCapicityUsed}%`,
          capacity: event.capacity,
        },
        "Event stat fetched"
      )
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};
