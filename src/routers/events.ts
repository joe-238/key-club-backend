import express from "express";
import * as eventController from "../controllers/event";
import { authMiddleware } from "../middleware/auth";
import { authRole } from "../middleware/role";
import { upload } from "../middleware/upload";

const router = express.Router();
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);
router.post(
  "/",
  authMiddleware,
  authRole("admin"),
  upload.single("image"),
  eventController.createEvent,
);
router.put(
  "/:id",
  authMiddleware,
  authRole("admin"),
  upload.single("image"),
  eventController.updateEvent,
);
router.delete(
  "/:id",
  authMiddleware,
  authRole("admin"),
  eventController.deleteEvent,
);
export default router;
