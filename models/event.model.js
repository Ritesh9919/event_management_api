import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
    },
    capacity: {
      type: Number,
      max: 1000,
      required: true,
    },
    registrations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { minimize: false }
);

export const Event =
  mongoose.models.event || mongoose.model("Event", eventSchema);
