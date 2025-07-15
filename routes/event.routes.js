import express from "express";
const router = express.Router();
import {
  createEvent,
  registerForEvent,
} from "../controllers/event.controller.js";

router.post("/create", createEvent);
router.post("/register/:eventId", registerForEvent);

export default router;
