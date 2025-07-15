import express from "express";
const router = express.Router();
import { createEvent } from "../controllers/event.controller.js";

router.post("/create", createEvent);

export default router;
