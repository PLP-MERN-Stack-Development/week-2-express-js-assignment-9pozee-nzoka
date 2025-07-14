 GET /api/products
   /**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Get all products with optional category filter and pagination.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */

/**
*starting the server with running server.js file runs at localhost:3000
*added folder "authentication" contains files for authentication and validation for products and access of the api
* models are being used to initialize items for my project its products. this enables easy database connection
*DATABASE
*mongoDB is used to store products
*mongoDB atlas is to create database connection viewed through atlas compass
*/