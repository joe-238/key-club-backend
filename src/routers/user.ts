import express, { Request, Response } from "express";
import * as userController from "../controllers/user";
const router = express.Router();
//router.get("/", userController.UserRegister);
router.get("/", (req: Request, res: Response) => {
  res.send("yo");
});
export default router;
