import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";

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

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
