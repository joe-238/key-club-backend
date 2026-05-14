import { Request, Response } from "express";
import * as serviceHourModel from "../models/serviceHours";

export const createHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId, hours, date } = req.body;
    if (!eventId || !userId || !hours || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (hours <= 0) {
      return res.status(400).json({ message: "Invalid hours" });
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
    res.status(500).json({ message: "Failed to create hours" });
  }
};

export const getHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.params;
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
    res.status(200).json({
      message: "Service Hours found",
      serviceHours,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get hours" });
  }
};

export const updateHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.params;
    const updates = req.body;

    if (updates.hours && updates.hours <= 0) {
      return res.status(400).json({ message: "Invalid hours" });
    }

    const updatedHours = await serviceHourModel.ServiceHours.findOneAndUpdate(
      { eventId, userId },
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedHours) {
      return res.status(404).json({ message: "Service hours not found" });
    }

    return res.status(200).json({
      message: "Service hours updated successfully",
      serviceHours: updatedHours,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update hours" });
  }
};

export const deleteHours = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.params;

    if (!eventId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const deleted = await serviceHourModel.ServiceHours.findOneAndDelete({
      eventId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Service hours not found" });
    }

    return res.status(200).json({
      message: "Service hours deleted successfully",
      serviceHours: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete service hours",
    });
  }
};
