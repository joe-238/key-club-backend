import { Request, Response } from "express";
import * as announcementModel from "../models/announcement";

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { status, publisher, title, description } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Failed to create announcement" });
  }
};
