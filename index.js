import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";

import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());

dotenv.config();

app.use(express.json());


app.get("/", async (req, res) => {
  res.send("hhelloo from online");
});

app.get("/test", async (req, res) => {
  const q = await pool.query("SELECT * from users");
  res.send(q);
});

app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

