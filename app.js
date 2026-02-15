const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./src/routes');

const app = express();

// Middlewares
// app.use(cors())
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Allow requests from this frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('query parser', 'extended');

// Health check
app.use('/api/v1', routes);
// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'API is running 🚀'
//   });
// });

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});


module.exports = app;
