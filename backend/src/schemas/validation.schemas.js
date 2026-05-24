import { z } from 'zod';

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10)
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  region: z.string().optional()
}).strict();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
}).strict();

const FRAUD_TYPES = ['PHISHING', 'MARKETPLACE', 'IDENTITY_THEFT', 'BANK_SCAM', 'SOCIAL_MEDIA', 'PHONE_SCAM', 'FAKE_LOAN', 'FAKE_INVESTMENT', 'ROMANCE_SCAM', 'FAKE_TECH_SUPPORT', 'OTHER'];

export const createReportSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  fraudType: z.enum(FRAUD_TYPES).optional().default('OTHER'),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  bankAccount: z.string().optional(),
  url: z.string().url().optional(),
  socialMediaProfile: z.string().optional(),
  region: z.string().optional(),
  anonymous: z.boolean().optional().default(false),
  evidenceUrls: z.array(z.string().url()).optional().default([]),
  compromiseIndicators: z.array(z.object({
    type: z.string().optional().default('phone'),
    value: z.string(),
    description: z.string().optional()
  })).optional()
}).strict();

export const searchReportsSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  bankAccount: z.string().optional(),
  url: z.string().optional(),
  page: paginationSchema.shape.page,
  limit: paginationSchema.shape.limit
}).strict();

export const adminReportsQuerySchema = z.object({
  status: z.enum(['PENDING', 'VALIDATED', 'REJECTED', 'INVESTIGATION']).optional(),
  fraudType: z.enum(FRAUD_TYPES).optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  region: z.string().optional(),
  page: paginationSchema.shape.page,
  limit: paginationSchema.shape.limit
}).strict();

export const validateReportSchema = z.object({
  status: z.enum(['VALIDATED', 'REJECTED', 'INVESTIGATION', 'PENDING'])
});