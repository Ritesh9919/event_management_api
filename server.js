import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";

// Routers
import eventRouter from "./routes/event.routes.js";

// app config
const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

// middleware
app.use(express.json());

// api endpoints
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/events", eventRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
