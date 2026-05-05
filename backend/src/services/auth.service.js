import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export const registerUser = async (userData) => {
  const { email, password, name } = userData;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'CITIZEN'
    },
    select: { id: true, email: true, name: true, role: true }
  });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};