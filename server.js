const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products'); 
const logger = require('./middleware/logger');
const auth = require('./authentication/auth');
const errorHandler = require('./middleware/errorHandler');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');




const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for your Express + Mongoose Product service'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


// Register logger for ALL routes
app.use(logger);

// Middleware
app.use(express.json());
app.use('/api/products', productsRouter);


// MongoDB connection
mongoose.connect('mongodb+srv://pozee:Pozee5268@cluster0.3awtv3c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
 

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Product routes
app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
