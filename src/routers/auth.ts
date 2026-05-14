import express from "express";
import * as authController from "../controllers/auth";
import { validateUserRegistration, handleValidationErrors } from "../middleware/validation";
const router = express.Router();
router.post("/register", validateUserRegistration, handleValidationErrors, authController.register);
router.post("/login", authController.login);
//router.post("/logout", authController.logout);
export default router;
