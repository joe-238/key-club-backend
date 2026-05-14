import { Request, Response } from "express";
import * as announcementModel from "../models/announcement";

export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { status, title, description, image } = req.body;

    const publisher = req.user?.id;

    if (!title || !description || !publisher) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const announcement = await announcementModel.Announcement.create({
      status,
      publisher,
      title,
      description,
      image,
    });

    return res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create announcement" });
  }
};

export const getAnnouncement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const announcement = await announcementModel.Announcement.findById(
      id,
    ).populate("publisher", "name email");
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({
      message: "Announcement found",
      announcement,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve announcement" });
  }
};

export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedAnnouncement =
      await announcementModel.Announcement.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    return res.status(200).json({
      message: "Announcement updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update announcement" });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await announcementModel.Announcement.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await announcementModel.Announcement.find()
      .populate("publisher", "name email")
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      message: "Announcements retrieved successfully",
      announcements,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve announcements",
    });
  }
};
