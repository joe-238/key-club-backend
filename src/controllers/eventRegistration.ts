import { Request, Response } from "express";
import * as eventRegistrationModel from "../models/eventRegistration";
import * as userModel from "../models/users";
export const register = async (req: Request, res: Response) => {
  try {
    const { status, eventId, osis } = req.body;
    if (!status || !eventId || !osis) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await userModel.User.findOne({ osis });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const registration = await eventRegistrationModel.EventRegistration.create({
      status,
      eventId,
      userId: user._id,
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
    const osis = Number(req.query.osis);

    if (!eventId || !osis) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const user = await userModel.User.findOne({ osis });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const registration = await eventRegistrationModel.EventRegistration.findOne(
      {
        eventId,
        userId: user._id,
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
