const express = require("express");

const router = express.Router();

const activityLogController = require("../controllers/activityLog.controller");

const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: Activity log management
 */

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Get all activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activity logs
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, activityLogController.getActivityLogs);

module.exports = router;