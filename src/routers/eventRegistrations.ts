import express from "express";
import * as eventRegistrationController from "../controllers/eventRegistration";
const router = express.Router();
router.get("/", eventRegistrationController.getRegistration);
router.post("/", eventRegistrationController.register);
router.delete("/", eventRegistrationController.deleteRegistration);
export default router;
