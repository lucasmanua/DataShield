import prisma from '../utils/prisma.js';

export const createReport = async (data, userId) => {
  const { compromiseIndicators, ...reportData } = data;
  const report = await prisma.report.create({
    data: {
      ...reportData,
      userId,
      compromiseIndicators: {
        create: compromiseIndicators || []
      }
    },
    include: {
      compromiseIndicators: true,
      user: { select: { id: true, name: true, email: true } }
    }
  });
  return report;
};

export const searchReports = async (filters, page = 1, limit = 10) => {
  const { phoneNumber, email, bankAccount } = filters;
  const where = {};
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber, mode: 'insensitive' };
  if (email) where.email = { contains: email, mode: 'insensitive' };
  if (bankAccount) where.bankAccount = { contains: bankAccount, mode: 'insensitive' };
  const skip = (page - 1) * limit;
  const reports = await prisma.report.findMany({
    where,
    skip,
    take: limit,
    include: {
      compromiseIndicators: true,
      user: { select: { id: true, name: true, email: true } },
      validator: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  const total = await prisma.report.count({ where });
  return { reports, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const searchReportsForCitizen = async (filters, userId, page = 1, limit = 10) => {
  const { phoneNumber, email, bankAccount } = filters;
  const where = { userId };
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber, mode: 'insensitive' };
  if (email) where.email = { contains: email, mode: 'insensitive' };
  if (bankAccount) where.bankAccount = { contains: bankAccount, mode: 'insensitive' };
  const skip = (page - 1) * limit;
  const reports = await prisma.report.findMany({
    where,
    skip,
    take: limit,
    include: {
      compromiseIndicators: true,
      validator: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  const total = await prisma.report.count({ where });
  return { reports, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getReportById = async (id, userRole, userId) => {
  const report = await prisma.report.findUnique({
    where: { id },
    include: {
      compromiseIndicators: true,
      user: { select: { id: true, name: true, email: true } },
      validator: { select: { id: true, name: true, email: true } }
    }
  });
  if (!report) throw new Error('Report not found');
  if (userRole === 'CITIZEN' && report.userId !== userId) {
    throw new Error('Access denied');
  }
  return report;
};