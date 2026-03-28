import { Request, Response } from "express";
import * as serviceHourModel from "../models/serviceHours";

export const createHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId, hours, date } = req.body;
    if (!eventId || !userId || !hours || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const serviceHours = await serviceHourModel.ServiceHours.create({
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

export const getHours = async (req: Request, res: Response) => {
  try {
    const eventId = req.query.eventId as string;
    const userId = req.query.userId as string;
    if (!eventId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const serviceHours = await serviceHourModel.ServiceHours.findOne({
      eventId,
      userId,
    });
    if (!serviceHours) {
      return res.status(404).json({ message: "Service hours not found" });
    }
    res.status(201).json({
      message: "Service Hours found",
      serviceHours,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get event" });
  }
};
