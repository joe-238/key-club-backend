import express from "express";
import * as eventRegistrationController from "../controllers/eventRegistration";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

/**
 * @openapi
 * /eventRegistrations/{eventId}/{userId}:
 *   get:
 *     tags:
 *       - Event Registrations
 *     summary: Get event registration details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event registration details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */
router.get("/:eventId/:userId", authMiddleware, eventRegistrationController.getRegistration);

/**
 * @openapi
 * /eventRegistrations:
 *   post:
 *     tags:
 *       - Event Registrations
 *     summary: Register a user for an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - userId
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered for event successfully
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: User already registered for this event
 */
router.post("/", authMiddleware, eventRegistrationController.register);

/**
 * @openapi
 * /eventRegistrations/{eventId}/{userId}:
 *   put:
 *     tags:
 *       - Event Registrations
 *     summary: Update event registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [registered, attended, cancelled]
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */
router.put("/:eventId/:userId", authMiddleware, eventRegistrationController.updateRegistration);

/**
 * @openapi
 * /eventRegistrations/{eventId}/{userId}:
 *   delete:
 *     tags:
 *       - Event Registrations
 *     summary: Delete event registration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Registration not found
 */
router.delete("/:eventId/:userId", authMiddleware, eventRegistrationController.deleteRegistration);

export default router;
