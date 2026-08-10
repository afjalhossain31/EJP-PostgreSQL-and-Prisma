import express from 'express';
import { createCategory, getAllCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/', createCategory); // ক্যাটাগরি তৈরি করার লিঙ্ক
router.get('/', getAllCategories); // সব ক্যাটাগরি দেখার লিঙ্ক

export default router;