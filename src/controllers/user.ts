import express, { Request, Response } from "express";
import * as userModel from "../models/users";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { osis, name, email, password, grade } = req.body;
    if (!osis || !name || !email || !password || !grade) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingUser = await userModel.User.findOne({
      $or: [{ email }, { osis }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email or Osis already in use" });
    }
    const user = await userModel.User.create({
      osis,
      name,
      email,
      password,
      grade,
    });

    res.status(201).json({
      id: user._id,
      osis: user.osis,
      name: user.name,
      email: user.email,
      role: user.role,
      grade: user.grade,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};
