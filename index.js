import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());  // Enable CORS for all routes

dotenv.config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse incoming JSON requests


app.get("/", async (req, res) => {
  res.send("hhelloo from online");
});

app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

