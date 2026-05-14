import express from "express";
import * as announcementController from "../controllers/announcement";
import { authMiddleware } from "../middleware/auth";
import { authRole } from "../middleware/role";
import { validateAnnouncementCreation, handleValidationErrors } from "../middleware/validation";

const router = express.Router();

/**
 * @openapi
 * /announcements:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get all announcements
 *     responses:
 *       200:
 *         description: List of all announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get("/", announcementController.getAnnouncements);

/**
 * @openapi
 * /announcements/{id}:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get announcement by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement details
 *       404:
 *         description: Announcement not found
 */
router.get("/:id", announcementController.getAnnouncement);

/**
 * @openapi
 * /announcements:
 *   post:
 *     tags:
 *       - Announcements
 *     summary: Create a new announcement (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 */
router.post(
  "/",
  authMiddleware,
  authRole("admin"),
  validateAnnouncementCreation,
  handleValidationErrors,
  announcementController.createAnnouncement,
);

/**
 * @openapi
 * /announcements/{id}:
 *   put:
 *     tags:
 *       - Announcements
 *     summary: Update an announcement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 *       404:
 *         description: Announcement not found
 */
router.put(
  "/:id",
  authMiddleware,
  authRole("admin"),
  validateAnnouncementCreation,
  handleValidationErrors,
  announcementController.updateAnnouncement,
);

/**
 * @openapi
 * /announcements/{id}:
 *   delete:
 *     tags:
 *       - Announcements
 *     summary: Delete an announcement (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin only
 *       404:
 *         description: Announcement not found
 */
router.delete(
  "/:id",
  authMiddleware,
  authRole("admin"),
  announcementController.deleteAnnouncement,
);

export default router;
