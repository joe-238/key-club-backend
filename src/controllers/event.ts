import { Request, Response } from "express";
import * as eventModel from "../models/events";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      type,
      description,
      location,
      hours,
      startTime,
      endTime,
      createdBy,
      maxParticipants,
      createdAt,
      isDraft,
    } = req.body;
    if (
      !title ||
      !type ||
      !description ||
      !location ||
      !hours ||
      !startTime ||
      !endTime ||
      !createdBy ||
      !createdAt ||
      isDraft === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const event = await eventModel.event.create({
      title,
      type,
      description,
      location,
      hours,
      startTime,
      endTime,
      createdBy,
      maxParticipants,
      createdAt,
      isDraft,
    });
    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};
