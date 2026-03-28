import { Request, Response } from "express";
import * as serviceHourModel from "../models/serviceHours";

export const createHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId, hours, date } = req.body;
    if (!eventId || !userId || !hours || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const serviceHours = serviceHourModel.serviceHours.create({
      eventId,
      userId,
      hours,
      date,
    });
    res.status(201).json({
      message: "Service Hours created successfully",
      serviceHours,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};
