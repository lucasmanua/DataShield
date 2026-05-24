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
  if (status !== 'PENDING' && report.user?.email && report.user?.email !== 'anonymous@datashield.app') {
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
  const { status, fraudType, phoneNumber, email, region } = filters;
  const where = {};
  if (status) where.status = status;
  if (fraudType) where.fraudType = fraudType;
  if (phoneNumber) where.phoneNumber = { contains: phoneNumber };
  if (email) where.email = { contains: email };
  if (region) where.region = { contains: region };
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

export const exportReports = async (filters, format = 'csv') => {
  const { status, fraudType, region } = filters;
  const where = {};
  if (status) where.status = status;
  if (fraudType) where.fraudType = fraudType;
  if (region) where.region = { contains: region, mode: 'insensitive' };

  const reports = await prisma.report.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      validator: { select: { id: true, name: true } },
      compromiseIndicators: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (format === 'csv') {
    const headers = 'ID,Título,Tipo Fraude,Teléfono,Email,Cuenta,URL,Región,Estado,Fecha,Denunciante,Validador\n';
    const rows = reports.map(r =>
      `"${r.id}","${r.title}","${r.fraudType}","${r.phoneNumber || ''}","${r.email || ''}","${r.bankAccount || ''}","${r.url || ''}","${r.region || ''}","${r.status}","${r.createdAt.toISOString()}","${r.anonymous ? 'Anónimo' : (r.user?.name || '')}","${r.validator?.name || ''}"`
    ).join('\n');
    return headers + rows;
  }

  return reports;
};

export const getAlerts = async () => {
  return prisma.alert.findMany({
    where: { active: true },
    orderBy: { count: 'desc' }
  });
};