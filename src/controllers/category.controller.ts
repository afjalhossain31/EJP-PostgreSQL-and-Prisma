import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// ১. Create a new Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newCategory = await prisma.category.create({
      data: { name }
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ২. Get All Categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isDeleted: false }
    });

    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৩. Get Category By ID (নির্দিষ্ট একটি ক্যাটাগরি দেখা)
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id, isDeleted: false },
      include: { products: true } // এই ক্যাটাগরির আন্ডারে কী কী প্রোডাক্ট আছে তাও দেখাবে
    });

    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found', data: null });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৪. Update Category (ক্যাটাগরি আপডেট করা)
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name }
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৫. Delete Category (সফট ডিলিট করা)
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft Delete: ডাটাবেস থেকে একেবারে না মুছে শুধু isDeleted কে true করে দেওয়া
    await prisma.category.update({
      where: { id },
      data: { isDeleted: true }
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};