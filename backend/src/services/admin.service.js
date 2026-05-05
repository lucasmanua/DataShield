import prisma from '../utils/prisma.js';
import { sendReportStatusEmail } from './email.service.js';

export const updateReportStatus = async (reportId, status, validatorId) => {
  // Obtener el reporte con los datos del usuario que lo creó
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  if (!report) throw new Error('Report not found');

  // Actualizar estado y validador
  const updated = await prisma.report.update({
    where: { id: reportId },
    data: {
      status,
      validatedBy: validatorId,
    },
    include: {
      compromiseIndicators: true,
      user: { select: { id: true, name: true, email: true } },
      validator: { select: { id: true, name: true, email: true } },
    },
  });

  // Enviar notificación por correo al usuario creador (si el estado cambió a VALIDATED o REJECTED)
  if (status !== 'PENDING' && report.user?.email) {
    await sendReportStatusEmail(
      report.user.email,
      report.user.name || 'Usuario',
      report.title,
      report.id,
      status,
      updated.validator?.name || 'DataShield'
    );
  }

  return updated;
};

export const getAllReportsForAdmin = async (filters, page = 1, limit = 10) => {
  const { status, phoneNumber, email } = filters;
  const where = {};
  if (status) where.status = status;
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber, mode: 'insensitive' };
  if (email) where.email = { contains: email, mode: 'insensitive' };
  const skip = (page - 1) * limit;
  const reports = await prisma.report.findMany({
    where,
    skip,
    take: limit,
    include: {
      user: { select: { id: true, name: true, email: true } },
      validator: { select: { id: true, name: true, email: true } },
      compromiseIndicators: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  const total = await prisma.report.count({ where });
  return { reports, total, page, limit, totalPages: Math.ceil(total / limit) };
};