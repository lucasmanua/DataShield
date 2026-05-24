import prisma from '../utils/prisma.js';

export const createReport = async (data, userId) => {
  const { compromiseIndicators, evidenceUrls, ...reportData } = data;
  const report = await prisma.report.create({
    data: {
      ...reportData,
      userId,
      compromiseIndicators: {
        create: (compromiseIndicators || []).map(ci => ({
          type: ci.type || 'phone',
          value: ci.value,
          description: ci.description
        }))
      },
      evidences: {
        create: (evidenceUrls || []).map(url => ({ url }))
      }
    },
    include: {
      compromiseIndicators: true,
      evidences: true,
      user: { select: { id: true, name: true, email: true } }
    }
  });

  await checkAndCreateAlerts(report);

  return report;
};

async function checkAndCreateAlerts(report) {
  const indicators = [];
  if (report.phoneNumber) indicators.push({ type: 'phone', value: report.phoneNumber });
  if (report.email) indicators.push({ type: 'email', value: report.email });
  if (report.bankAccount) indicators.push({ type: 'bank', value: report.bankAccount });
  if (report.url) indicators.push({ type: 'url', value: report.url });

  for (const indicator of indicators) {
    const count = await prisma.report.count({
      where: {
        status: 'VALIDATED',
        OR: [
          { phoneNumber: indicator.value },
          { email: indicator.value },
          { bankAccount: indicator.value },
          { url: indicator.value }
        ]
      }
    });

    if (count >= 3) {
      await prisma.alert.upsert({
        where: { indicator_type: { indicator: indicator.value, type: indicator.type } },
        create: { indicator: indicator.value, type: indicator.type, count, active: true },
        update: { count, active: true }
      });
    }
  }
}

export const searchReports = async (filters, page = 1, limit = 10) => {
  const { phoneNumber, email, bankAccount, url } = filters;
  const where = { status: 'VALIDATED' };
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber };
  if (email) where.email = { contains: email };
  if (bankAccount) where.bankAccount = { contains: bankAccount };
  if (url) where.url = { contains: url };
  const skip = (page - 1) * limit;
  const reports = await prisma.report.findMany({
    where,
    skip,
    take: limit,
    include: {
      compromiseIndicators: true,
      user: { select: { id: true, name: true } },
      validator: { select: { id: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  const total = await prisma.report.count({ where });
  return { reports, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const searchReportsForCitizen = async (filters, userId, page = 1, limit = 10) => {
  const { phoneNumber, email, bankAccount, url } = filters;
  const where = { userId };
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber };
  if (email) where.email = { contains: email };
  if (bankAccount) where.bankAccount = { contains: bankAccount };
  if (url) where.url = { contains: url };
  const skip = (page - 1) * limit;
  const reports = await prisma.report.findMany({
    where,
    skip,
    take: limit,
    include: {
      compromiseIndicators: true,
      validator: { select: { id: true, name: true } }
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

export const getPublicStats = async () => {
  const [
    totalReports,
    validatedReports,
    pendingReports,
    reportsByType,
    reportsByRegion,
    recentAlerts
  ] = await Promise.all([
    prisma.report.count(),
    prisma.report.count({ where: { status: 'VALIDATED' } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.report.groupBy({
      by: ['fraudType'],
      _count: true,
      orderBy: { _count: { fraudType: 'desc' } }
    }),
    prisma.report.groupBy({
      by: ['region'],
      _count: true,
      orderBy: { _count: { region: 'desc' } },
      where: { region: { not: null } }
    }),
    prisma.alert.findMany({
      where: { active: true },
      orderBy: { count: 'desc' },
      take: 10
    })
  ]);

  const investigationCount = await prisma.report.count({ where: { status: 'INVESTIGATION' } });
  const rejectedCount = await prisma.report.count({ where: { status: 'REJECTED' } });

  return {
    totalReports,
    validatedReports,
    pendingReports,
    investigationCount,
    rejectedCount,
    reportsByType: reportsByType.map(r => ({ type: r.fraudType, count: r._count })),
    reportsByRegion: reportsByRegion.map(r => ({ region: r.region, count: r._count })),
    activeAlerts: recentAlerts
  };
};