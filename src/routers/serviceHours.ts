import express, { Request, Response } from "express";
import * as serviceHoursController from "../controllers/serviceHour";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("yo");
});
router.post("/", serviceHoursController.createHours);

export default router;
