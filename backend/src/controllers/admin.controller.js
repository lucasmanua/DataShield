import * as adminService from '../services/admin.service.js';

export const validateReport = async (req, res) => {
  try {
    const { status } = req.body;
    const reportId = parseInt(req.params.id);
    const updated = await adminService.updateReportStatus(reportId, status, req.user.id);
    res.json(updated);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const getAllReports = async (req, res) => {
  try {
    const { status, fraudType, phoneNumber, email, region, page, limit } = req.query;
    const filters = { status, fraudType, phoneNumber, email, region };
    const result = await adminService.getAllReportsForAdmin(filters, page, limit);
    res.json(result);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const exportReports = async (req, res) => {
  try {
    const { status, fraudType, region, format } = req.query;
    const filters = { status, fraudType, region };
    const output = await adminService.exportReports(filters, format || 'csv');

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=datashield-reportes-${Date.now()}.csv`);
      return res.send(output);
    }

    res.json(output);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const getAlerts = async (req, res) => {
  try {
    const alerts = await adminService.getAlerts();
    res.json(alerts);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};