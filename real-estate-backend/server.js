// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
import { authenticate } from './middleware/auth.middleware.js';
import db from './utils/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/properties', authenticate, propertyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await db.sync();
    await db.authenticate();
    console.log('MySQL connected');
  } catch (err) {
    console.error('DB connection failed:', err);
  }
  console.log(`Server running on port ${PORT}`);
});