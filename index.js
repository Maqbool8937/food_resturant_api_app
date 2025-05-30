import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/testRoutes.js'; // ✅ Import route with .js extension
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';



// Load environment variables
dotenv.config();

// Database connection
connectDB();
// Create app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', testRoutes);
// register routes
app.use('/api/v1/auth',authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to my API</h1>');
});

// Port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
