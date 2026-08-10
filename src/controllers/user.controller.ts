import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// ১. Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ২. Get User By ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: String(id) }, // ID string হিসেবে কনভার্ট করা হলো
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        reviews: true 
      }
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found', data: null });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৩. Update User (এই ফাংশনটিই মিসিং ছিল!)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, status } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: { name, role, status },
      select: { id: true, name: true, email: true, role: true, status: true }
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};

// ৪. Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.update({
      where: { id: String(id) },
      data: { isDeleted: true }
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};