import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import pool, { initDatabase } from './models/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Root / Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', app: 'EventPulse API', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Automatically verify and initialize database & schema on boot
  await initDatabase();

  try {
    const connection = await pool.getConnection();
    console.log(`✅ MySQL Database connected successfully to "${process.env.DB_NAME || 'eventdb'}"`);
    connection.release();
  } catch (error) {
    console.error('⚠️  MySQL Database connection status:', error.message);
    console.log('💡 Tip: Ensure MySQL is running on port 3306 with credentials in .env');
  }

  app.listen(PORT, () => {
    console.log(`🚀 EventPulse Server is running on port ${PORT} (http://localhost:${PORT})`);
  });
}

startServer();
