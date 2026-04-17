import { Request, Response } from "express";
import * as userModel from "../models/users";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
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
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await userModel.User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login user" });
  }
};
