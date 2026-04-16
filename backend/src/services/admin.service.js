import prisma from '../utils/prisma.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log('📧 SMTP_HOST:', process.env.SMTP_HOST);
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Envía un email notificando el cambio de estado del reporte
 */
async function sendStatusNotification(email, reportTitle, status, reportId) {
  const statusText = status === 'VALIDATED' ? '✅ VALIDADO' : '❌ RECHAZADO';
  const statusMessage = status === 'VALIDATED'
    ? 'Hemos verificado tu reporte y lo hemos marcado como **fraude válido**. Gracias por contribuir a la seguridad digital.'
    : 'Lamentablemente, tras revisar tu reporte, no hemos encontrado suficientes evidencias para validarlo como fraude.';

  const mailOptions = {
    from: `"DataShield" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `DataShield - Tu reporte #${reportId} ha sido ${status === 'VALIDATED' ? 'validado' : 'rechazado'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #0066cc;">🛡️ DataShield - Centro de Reportes de Fraude</h2>
        <p>Hola,</p>
        <p>El reporte <strong>"${reportTitle}"</strong> (ID #${reportId}) ha sido <strong style="color: ${status === 'VALIDATED' ? 'green' : 'red'};">${statusText}</strong>.</p>
        <p>${statusMessage}</p>
        <p>Puedes ver el estado actualizado ingresando a la plataforma y buscando por el teléfono, email o cuenta bancaria que denunciaste.</p>
        <hr>
        <small>Este es un mensaje automático. Por favor no responder a este correo.</small>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Correo de notificación enviado a ${email} para reporte #${reportId}`);
  } catch (error) {
    console.error(`❌ Error al enviar correo a ${email}:`, error.message);
  }
}

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
    await sendStatusNotification(report.user.email, report.title, status, report.id);
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