import express from "express";
import * as eventRegistrationController from "../controllers/eventRegistration";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
router.get("/:eventId/:userId", authMiddleware, eventRegistrationController.getRegistration);
router.post("/", authMiddleware, eventRegistrationController.register);
router.put("/:eventId/:userId", authMiddleware, eventRegistrationController.updateRegistration);
router.delete("/:eventId/:userId", authMiddleware, eventRegistrationController.deleteRegistration);
export default router;
