import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import { Role } from "../models/users";

interface JwtPayload {
  id: string;
  email: string;
  role: Role;
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    //check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid Authorization header",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = decoded;

    // Role authorized
    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to login user",
    });
  }
};
