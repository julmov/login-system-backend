import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();
router.use(express.json());

router.post("/register", register);
router.post("/login", login);
router.use(authMiddleware);


export default router;
