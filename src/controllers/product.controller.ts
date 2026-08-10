import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// ১. Create a new Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, categoryId } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        categoryId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ২. Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isDeleted: false },
      include: { category: true } // কোন ক্যাটাগরির প্রোডাক্ট সেটাও সাথে দেখাবে
    });

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৩. Get Product By ID (নির্দিষ্ট একটি প্রোডাক্ট দেখা)
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id, isDeleted: false },
      include: { category: true, reviews: true } // ক্যাটাগরি এবং রিভিউ সহ দেখাবে
    });

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found', data: null });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৪. Update Product (প্রোডাক্ট আপডেট করা)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৫. Delete Product (Soft Delete)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft Delete: ডাটাবেস থেকে একেবারে না মুছে শুধু isDeleted কে true করে দেওয়া
    await prisma.product.update({
      where: { id },
      data: { isDeleted: true }
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};