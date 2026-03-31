import { Request, Response } from "express";
import * as eventRegistrationModel from "../models/eventRegistration";
import * as userModel from "../models/users";
export const register = async (req: Request, res: Response) => {
  try {
    const { eventId, userId } = req.body;
    if (!eventId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const registration = await eventRegistrationModel.EventRegistration.create({
      eventId,
      userId,
    });
    res.status(201).json({
      message: "Registration created successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const getRegistration = async (req: Request, res: Response) => {
  try {
    const eventId = req.query.eventId as string;
    const userId = req.query.userId as string;

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

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const eventId = req.query.eventId as string;
    const userId = req.query.userId as string;
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
