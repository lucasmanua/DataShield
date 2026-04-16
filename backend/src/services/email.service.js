import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // true para 465, false para otros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReportStatusEmail = async (userEmail, userName, reportTitle, reportId, status, validatorName) => {
  const statusText = status === 'VALIDATED' ? 'validado como fraude' : 'rechazado';
  const statusColor = status === 'VALIDATED' ? 'verde' : 'rojo';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #0066cc;">DataShield - Actualización de tu reporte</h2>
      <p>Hola <strong>${userName}</strong>,</p>
      <p>Tu reporte <strong>"${reportTitle}"</strong> (ID: ${reportId}) ha sido <strong style="color: ${status === 'VALIDATED' ? 'green' : 'red'};">${statusText}</strong> por el moderador <strong>${validatorName}</strong>.</p>
      ${status === 'VALIDATED' 
        ? '<p>✅ Este reporte ahora es considerado un fraude verificado. Ayuda a otros ciudadanos compartiendo esta información.</p>'
        : '<p>❌ Este reporte ha sido rechazado. Si consideras que es un error, puedes contactar a soporte.</p>'
      }
      <p>Puedes ver el estado actualizado en tu panel de DataShield.</p>
      <hr>
      <p style="font-size: 12px; color: #666;">Este es un mensaje automático, por favor no responder.</p>
    </div>
  `;

  const text = `DataShield - Tu reporte "${reportTitle}" (ID: ${reportId}) ha sido ${statusText} por ${validatorName}.`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `DataShield: Tu reporte #${reportId} ha sido ${statusText}`,
    text,
    html,
  });
};