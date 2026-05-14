import express from "express";
import * as userController from "../controllers/user";
const router = express.Router();
router.get("/:osis", userController.getUser);
router.delete("/:id", userController.deleteUser);
export default router;
