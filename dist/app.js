import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'; // রাউটটি ইমপোর্ট করা হলো
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import reviewRoutes from './routes/review.routes.js';
import userRoutes from './routes/user.routes.js';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
// Health Check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the SCIC/EJP-13 Backend API',
        data: {}
    });
});
app.use('/api/auth', authRoutes);
export default app;
//# sourceMappingURL=app.js.map