import express from 'express';
import mongoose from 'mongoose';
import enrollment from './routes/enrollmentRoute.js';

const app = express();
const MONGO_URL = "mongodb://localhost:27017/";

// Route to enrollment
app.use("/enrollment", enrollment);
app.listen(3000, () => console.log('Server is running on port 3000'));