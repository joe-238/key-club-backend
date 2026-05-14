import { Role } from "../models/users"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
        email: string;
      };
      file?: Express.Multer.File;
    }
  }
}

export {};
