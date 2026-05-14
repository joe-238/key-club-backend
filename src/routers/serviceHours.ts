import express from "express";
import * as serviceHoursController from "../controllers/serviceHour";
import { authMiddleware } from "../middleware/auth";
const router = express.Router();
router.get(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.getHours,
);
router.post("/", authMiddleware, serviceHoursController.createHours);
router.put(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.updateHours,
);
router.delete(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.deleteHours,
);
export default router;
