import express from "express";
import * as serviceHoursController from "../controllers/serviceHour";
const router = express.Router();
router.get("/", serviceHoursController.getHours);
router.post("/", serviceHoursController.createHours);
router.delete("/", serviceHoursController.deleteHours);
export default router;
