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
    const event = await eventModel.Event.create({
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

export const getEvent = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const event = await eventModel.Event.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json({
      message: "Event found",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get event" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await eventModel.Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.status(200).json({
      message: "Event deleted",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get event" });
  }
};
