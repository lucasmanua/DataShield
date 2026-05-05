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
    const { status, phoneNumber, email, page, limit } = req.query;
    const filters = { status, phoneNumber, email };
    const result = await adminService.getAllReportsForAdmin(filters, page, limit);
    res.json(result);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};