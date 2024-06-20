import express from "express";
import pool from "../config/database.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all users from users_greentripper table
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users_greentripper");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
