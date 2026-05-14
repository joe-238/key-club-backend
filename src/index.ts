// Type augmentation for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
      };
      file?: Express.Multer.File;
    }
  }
}

import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "./db/mongoose";
import usersRouter from "./routers/users";
import eventsRouter from "./routers/events";
import serviceHoursRouter from "./routers/serviceHours";
import eventRegistrationsRouter from "./routers/eventRegistrations";
import authRouter from "./routers/auth";
import announcementsRouter from "./routers/announcements";
import { logger } from "./middleware/logger";
const app = express();
app.use(express.json());
app.use(logger);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/serviceHours", serviceHoursRouter);
app.use("/eventRegistrations", eventRegistrationsRouter);
app.use("/auth", authRouter);
app.use("/announcements", announcementsRouter);
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

async function startServer() {
  await connectDB(); // wait for DB connection first
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
startServer();
//backend for key club
//use postman to test data
