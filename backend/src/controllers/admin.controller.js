import * as adminService from '../services/admin.service.js';

export const validateReport = async (req, res) => {
  try {
    const { status } = req.body;
    const reportId = parseInt(req.params.id);
    const updated = await adminService.updateReportStatus(reportId, status, req.user.id);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const { status, phoneNumber, email, page, limit } = req.query;
    const filters = { status, phoneNumber, email };
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const result = await adminService.getAllReportsForAdmin(filters, pageNum, limitNum);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};