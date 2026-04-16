import * as reportsService from '../services/reports.service.js';

export const createReport = async (req, res) => {
  try {
    const report = await reportsService.createReport(req.body, req.user.id);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchReports = async (req, res) => {
  try {
    const { phoneNumber, email, bankAccount, page, limit } = req.query;
    const filters = { phoneNumber, email, bankAccount };
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    let result;
    if (req.user.role === 'CITIZEN') {
      result = await reportsService.searchReportsForCitizen(filters, req.user.id, pageNum, limitNum);
    } else {
      result = await reportsService.searchReports(filters, pageNum, limitNum);
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await reportsService.getReportById(parseInt(req.params.id), req.user.role, req.user.id);
    res.json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};