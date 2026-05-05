import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
}).strict();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
}).strict();

export const createReportSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  bankAccount: z.string().optional(),
  evidenceUrls: z.array(z.string().url()).optional().default([]),
  compromiseIndicators: z.array(z.object({
    name: z.string(),
    description: z.string().optional()
  })).optional()
}).strict();

export const searchReportsSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  bankAccount: z.string().optional(),
  page: paginationSchema.shape.page,
  limit: paginationSchema.shape.limit
}).strict();

export const adminReportsQuerySchema = z.object({
  status: z.enum(['PENDING', 'VALIDATED', 'REJECTED']).optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  page: paginationSchema.shape.page,
  limit: paginationSchema.shape.limit
}).strict();

export const validateReportSchema = z.object({
  status: z.enum(['VALIDATED', 'REJECTED'])
});