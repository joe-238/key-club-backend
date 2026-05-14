import express from "express";
import * as serviceHoursController from "../controllers/serviceHour";
import { authMiddleware } from "../middleware/auth";
const router = express.Router();

/**
 * @openapi
 * /serviceHours/{eventId}/user/{userId}:
 *   get:
 *     tags:
 *       - Service Hours
 *     summary: Get service hours for a user in an event
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
 *         description: Service hours record
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service hours not found
 */
router.get(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.getHours,
);

/**
 * @openapi
 * /serviceHours:
 *   post:
 *     tags:
 *       - Service Hours
 *     summary: Create a new service hours record
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
 *               - hours
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *               hours:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Service hours record created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, serviceHoursController.createHours);

/**
 * @openapi
 * /serviceHours/{eventId}/user/{userId}:
 *   put:
 *     tags:
 *       - Service Hours
 *     summary: Update service hours record
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
 *               hours:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Service hours updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service hours not found
 */
router.put(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.updateHours,
);

/**
 * @openapi
 * /serviceHours/{eventId}/user/{userId}:
 *   delete:
 *     tags:
 *       - Service Hours
 *     summary: Delete service hours record
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
 *         description: Service hours deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service hours not found
 */
router.delete(
  "/:eventId/user/:userId",
  authMiddleware,
  serviceHoursController.deleteHours,
);
export default router;
