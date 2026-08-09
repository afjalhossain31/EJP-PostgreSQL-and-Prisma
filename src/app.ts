import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; // রাউটটি ইমপোর্ট করা হলো

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the SCIC/EJP-13 Backend API',
    data: {}
  });
});

// Mount Routes (আমাদের Auth API এর মেইন লিঙ্ক)
app.use('/api/auth', authRoutes);

export default app;