import pool from "../config/database.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password || !username)
    return res.status(400).send({ error: "Invalid request" });

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users_greentripper (email, password, username) VALUES ($1, $2, $3)",
      [email, encryptedPassword, username]
    );

    return res.send({ info: "User successfully created" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Invalid request" });

  try {
    const q = await pool.query(
      "SELECT password, id, username FROM users_greentripper WHERE email=$1",
      [email]
    );

    if (q.rowCount === 0) {
      return res.status(404).send({ error: "This user does not exist" });
    }

    const result = q.rows[0];
    const match = await bcrypt.compare(password, result.password);

    if (!match) {
      return res.status(403).send({ error: "Wrong password" });
    }

    const token = await JWT.sign(
      { id: result.id, username: result.username, email },
      process.env.JWT_SECRET,
      {
        algorithm: "HS512",
        expiresIn: "1h",
      }
    );

    return res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Cannot generate token" });
  }
};
