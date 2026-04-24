import { NextFunction, Request, Response } from "express";

export const authRole = (roles: string[] | string) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: No user information found",
        });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You do not have access to this resource",
        });
      }
      next();
    } catch (error) {
      console.error("authRole middleware error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during role authorization",
      });
    }
  };
};
