import path from 'path';
import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';

// সবগুলো রাউটের শেষে .js যুক্ত করা হলো

import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import reviewRoutes from './routes/review.routes.js';
import userRoutes from './routes/user.routes.js';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/categories', categoryRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health Check
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json({
//     success: true,
//     message: 'Welcome to the SCIC/EJP-13 Backend API',
//     data: {}
//   });
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

export default app;