import express from "express";
import * as announcementController from "../controllers/announcement";
import { authMiddleware } from "../middleware/auth";
import { authRole } from "../middleware/role";
import { validateAnnouncementCreation, handleValidationErrors } from "../middleware/validation";

const router = express.Router();

router.get("/", announcementController.getAnnouncements);

router.get("/:id", announcementController.getAnnouncement);

router.post(
  "/",
  authMiddleware,
  authRole("admin"),
  validateAnnouncementCreation,
  handleValidationErrors,
  announcementController.createAnnouncement,
);

router.put(
  "/:id",
  authMiddleware,
  authRole("admin"),
  validateAnnouncementCreation,
  handleValidationErrors,
  announcementController.updateAnnouncement,
);

router.delete(
  "/:id",
  authMiddleware,
  authRole("admin"),
  announcementController.deleteAnnouncement,
);

export default router;
