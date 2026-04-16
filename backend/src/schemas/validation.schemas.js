import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['ADMIN', 'MODERATOR', 'CITIZEN']).optional().default('CITIZEN')
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

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
});

export const searchReportsSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  bankAccount: z.string().optional(),
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number)
});

export const validateReportSchema = z.object({
  status: z.enum(['VALIDATED', 'REJECTED'])
});