import express from "express";
const router = express.Router();
import {
  createEvent,
  registerForEvent,
  getEventDetails,
  listUpcomingEvent,
  cancelRegistration,
  getEventStats,
} from "../controllers/event.controller.js";

router.post("/create", createEvent);
router.post("/register/:eventId", registerForEvent);
router.get("/getDetails", getEventDetails);
router.get("/upcoming", listUpcomingEvent);
router.delete("/cancel", cancelRegistration);
router.get("/stats/:eventId", getEventStats);

export default router;
