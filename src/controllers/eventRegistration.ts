import { Request, Response } from "express";
import * as eventRegistrationModel from "../models/eventRegistration";

export const register = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.body;

    const exists = await eventRegistrationModel.EventRegistration.findOne({
      eventId,
      userId,
    });

    if (exists) {
      return res.status(409).json({ message: "Already registered" });
    }

    const registration = await eventRegistrationModel.EventRegistration.create({
      eventId,
      userId,
    });

    return res.status(201).json({
      message: "Registration created successfully",
      registration,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register" });
  }
};

export const getRegistration = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    if (!eventId || !userId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const registration = await eventRegistrationModel.EventRegistration.findOne(
      {
        eventId,
        userId,
      },
    );
    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }
    res.status(200).json({
      message: "Registration found",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get registration" });
  }
};

export const updateRegistration = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.params;
    const updates = req.body;

    const updatedRegistration = await eventRegistrationModel.EventRegistration.findOneAndUpdate(
      { eventId, userId },
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json({
      message: "Registration updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update registration" });
  }
};

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;
    if (!userId || !eventId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const result = await eventRegistrationModel.EventRegistration.deleteOne({
      eventId,
      userId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete registration" });
  }
};
