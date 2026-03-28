import express from "express";
import * as eventController from "../controllers/event";
const router = express.Router();
router.get("/", eventController.getEvent);
router.post("/", eventController.createEvent);

export default router;
