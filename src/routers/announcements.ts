import express from "express";
import * as announcementController from "../controllers/announcement";
const router = express.Router();
router.get("/", announcementController.getAnnouncements);
router.post("/", announcementController.createAnnouncement);
router.delete("/", announcementController.deleteAnnouncement);
export default router;
