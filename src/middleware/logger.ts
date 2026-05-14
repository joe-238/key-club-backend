import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const time = new Date().toLocaleDateString();
  console.log(`${time} ${req.method} ${req.url}`);
  next();
}
