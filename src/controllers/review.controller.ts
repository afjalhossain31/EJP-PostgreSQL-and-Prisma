import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// ১. Create a Review (রিভিউ তৈরি করা)
export const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, userId, productId } = req.body;

    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        productId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ২. Get All Reviews (সবগুলো রিভিউ দেখা)
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isDeleted: false },
      include: { 
        user: true,      // কে রিভিউ দিয়েছে তার নাম দেখাবে
        product: true    // কোন প্রোডাক্টে রিভিউ দিয়েছে তা দেখাবে
      } 
    });

    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};