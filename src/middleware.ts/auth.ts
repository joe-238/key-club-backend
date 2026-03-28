import { NextFunction } from "express";

export function authCheck(req: Request, res: Response, next: NextFunction) {
  if (req.query.user === "insert like stuff idk bro") {
    next();
  } else {
    res.status(403).json({
      error: "no",
    });
  }
}
//used to protect yo routes so no one can see yo shit ;-;
