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