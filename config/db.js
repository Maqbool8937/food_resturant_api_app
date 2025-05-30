// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
