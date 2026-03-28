import express, { Request, Response } from "express";
import * as eventController from "../controllers/event";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("yo");
});
router.post("/", (req: Request, res: Response) => {
  eventController.createEvent(req, res);
});

export default router;
