import express from "express";
import * as userController from "../controllers/user";
import { upload } from "../middleware/upload";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
router.get("/:osis", userController.getUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.put(
  "/:id/profile-image",
  authMiddleware,
  upload.single("image"),
  userController.updateProfileImage
);

export default router;
