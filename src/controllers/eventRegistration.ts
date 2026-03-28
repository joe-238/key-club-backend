import { Request, Response } from "express";
import * as eventRegistrationModel from "../models/eventRegistration";

export const register = async (req: Request, res: Response) => {
  try {
    const { status, eventId, userId } = req.body;
    if (!status || !eventId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const registration = eventRegistrationModel.eventRegistration.create({
      status,
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
