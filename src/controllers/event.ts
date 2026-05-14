import { Request, Response } from "express";
import * as eventModel from "../models/events";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const image = req.file ? req.file.path : undefined;

    const {
      title,
      type,
      description,
      location,
      hours,
      startTime,
      endTime,
      maxParticipants,
      isDraft,
    } = req.body;

    const createdBy = req.user?.id;

    if (!title || !type || !location || !hours || !startTime || !endTime) {
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
      isDraft,
      image,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create event" });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
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

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventModel.Event.find().populate(
      "createdBy",
      "name email",
    );

    return res.status(200).json({ events });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedEvent = await eventModel.Event.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update event" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
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
    res.status(500).json({ message: "Failed to delete event" });
  }
};
