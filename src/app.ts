import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; // রাউটটি ইমপোর্ট করা হলো
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/categories', categoryRoutes); 
app.use('/api/products', productRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the SCIC/EJP-13 Backend API',
    data: {}
  });
});

app.use('/api/auth', authRoutes);

export default app;