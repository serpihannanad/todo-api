const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

const { protect } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Belajar Coding
 *               description:
 *                 type: string
 *                 example: Kategori untuk belajar coding
 *     responses:
 *       201:
 *         description: Category successfully created
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6aa34b542db75d4a68f44dc9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Belajar Coding
 *               description:
 *                 type: string
 *                 example: Kategori untuk belajar coding
 *     responses:
 *       200:
 *         description: Category successfully updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.put("/:id", protect, categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6aa34b542db75d4a68f44dc9
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete("/:id", protect, categoryController.deleteCategory);

module.exports = router;