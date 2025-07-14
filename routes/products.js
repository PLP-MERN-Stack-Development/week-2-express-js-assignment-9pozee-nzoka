// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         inStock:
 *           type: integer
 *         imageUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */



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
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
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
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */


router.get('/', async (req, res) => {
  // Your handler here...
});

// GET /api/products - List all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products - Create new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
    imageUrl: req.body.imageUrl
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//query parameters for filtering products by category
router.get('/', async (req, res) => {
  const { category } = req.query;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const products = await Product.find(filter);
  res.json(products);
});
//end for query filtering


// GET /api/products?category=Electronics&page=1&limit=10 - pagination support for the product listing endpoint
router.get('/', async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (category) filter.category = category;

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(filter);

  res.json({
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    products
  });
});
// end of pagination


// GET /api/products/search?name=tv - a search endpoint that allows searching products by name
router.get('/search', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'Name query param is required' });
  }

  const regex = new RegExp(name, 'i'); // case-insensitive
  const products = await Product.find({ name: regex });

  res.json(products);
});
//end of the search


// GET /api/products/stats - Implement route for getting product statistics (e.g., count by category)
router.get('/stats', async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(stats);
});
// end of the count

// validation
const { productValidationRules, validate } = require('../authentication/Product');
const auth = require('../authentication/auth');

// Apply auth to all product routes:
router.use(auth);

// POST /api/products
router.post('/', productValidationRules, validate, async (req, res) => {
  // creation logic
});

// PUT /api/products/:id
router.put('/:id', productValidationRules, validate, async (req, res) => {
  // update logic
});


module.exports = router;
