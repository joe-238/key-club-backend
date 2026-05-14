import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

export const validateUserRegistration = [
  body("osis")
    .isNumeric()
    .isLength({ min: 9, max: 9 })
    .withMessage("OSIS must be 9 digits"),
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("grade")
    .isNumeric()
    .isInt({ min: 9, max: 12 })
    .withMessage("Grade must be between 9 and 12"),
];

export const validateEventCreation = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("type").trim().isLength({ min: 1 }).withMessage("Type is required"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty if provided"),
  body("location").trim().isLength({ min: 1 }).withMessage("Location is required"),
  body("hours").isNumeric().isFloat({ min: 0 }).withMessage("Hours must be a positive number"),
  body("startTime").isISO8601().withMessage("Valid start time required"),
  body("endTime").isISO8601().withMessage("Valid end time required"),
  body("maxParticipants")
    .optional()
    .isNumeric()
    .isInt({ min: 1 })
    .withMessage("Max participants must be a positive integer"),
];

export const validateAnnouncementCreation = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("description").trim().isLength({ min: 1 }).withMessage("Description is required"),
];