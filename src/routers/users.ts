import express, { Request, Response } from "express";
import * as userController from "../controllers/user";
const router = express.Router();
//router.get("/", userController.UserRegister);
router.get("/", (req: Request, res: Response) => {
  res.send("idk");
});
router.post("/", (req: Request, res: Response) => {
  userController.createUser(req, res);
});
export default router;
