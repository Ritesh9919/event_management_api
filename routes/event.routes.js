import express from "express";
const router = express.Router();
import {
  createEvent,
  registerForEvent,
  getEventDetails,
} from "../controllers/event.controller.js";

router.post("/create", createEvent);
router.post("/register/:eventId", registerForEvent);
router.get("/getDetails", getEventDetails);

export default router;
