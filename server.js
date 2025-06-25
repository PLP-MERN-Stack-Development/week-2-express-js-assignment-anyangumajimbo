// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Custom logger middleware
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware/route
});

// Authentication middleware
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== '123456') {
    return res.status(401).json({ error: 'Unauthorized. Missing or invalid API key.' });
  }

  next();
});


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  const { category } = req.query;

 let result = [...products];

// Filter by category if present
if (req.query.category) {
  result = result.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
}

// Search by name if present
if (req.query.search) {
  const keyword = req.query.search.toLowerCase();
  result = result.filter(p => p.name.toLowerCase().includes(keyword));
}


// Pagination
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || result.length; // return all if no limit
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const paginated = result.slice(startIndex, endIndex);

res.json(paginated);
});

// Product statistics route
app.get('/api/products/stats', (req, res) => {
  
  const stats = {};

  for (const product of products) {
    const cat = product.category.toLowerCase();
    stats[cat] = (stats[cat] || 0) + 1;
  }

  res.json(stats);
});


// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Validation middleware for product data
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid or missing product fields' });
  }

  next();
}

// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;


  const newProduct = {
    id: uuidv4(), // Generate unique ID
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const productIndex = products.findIndex(p => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Update product
  products[productIndex] = {
    ...products[productIndex],
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[productIndex]);
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully', product: deletedProduct[0] });
});







// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 