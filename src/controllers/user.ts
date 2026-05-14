import { Request, Response } from "express";
import * as userModel from "../models/users";

export const getUser = async (req: Request, res: Response) => {
  try {
    const osis = Number(req.params.osis);
    if (isNaN(osis)) {
      return res.status(400).json({ message: "Invalid OSIS" });
    }
    const user = await userModel.User.findOne({ osis });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        grade: user.grade,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await userModel.User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = req.file.path;

    const user = await userModel.User.findByIdAndUpdate(
      req.params.id,
      { profileImage: image },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = {
      name: req.body.name,
      email: req.body.email,
      grade: req.body.grade,
    };
    const userId = req.params.id;

    const updated = await userModel.User.findByIdAndUpdate(
      userId,
      allowedUpdates,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated",
      user: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: "Update failed" });
  }
};
