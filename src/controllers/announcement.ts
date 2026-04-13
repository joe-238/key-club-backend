import { Request, Response } from "express";
import * as announcementModel from "../models/announcement";

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { status, publisher, title, description } = req.body;
    if (!status || !publisher || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const announcement = await announcementModel.announcement.create({
      status,
      publisher,
      title,
      description,
    });
    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const announcement = await announcementModel.announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }
    res.status(200).json({ message: "Event found", announcement });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve announcements" });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const announcement = await announcementModel.announcement.findByIdAndDelete(
      id
    );
    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
