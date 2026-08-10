import express from 'express';
import { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById); // ID দিয়ে খোঁজা
router.put('/:id', updateCategory); // আপডেট করা
router.delete('/:id', deleteCategory); // সফট ডিলিট করা

export default router;