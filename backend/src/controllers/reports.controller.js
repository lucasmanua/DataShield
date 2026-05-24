import * as reportsService from '../services/reports.service.js';

export const createReport = async (req, res) => {
  try {
    const report = await reportsService.createReport(req.body, req.user.id);
    res.status(201).json(report);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const searchReports = async (req, res) => {
  try {
    const { phoneNumber, email, bankAccount, url, page, limit } = req.query;
    const filters = { phoneNumber, email, bankAccount, url };
    let result;
    if (req.user.role === 'CITIZEN') {
      result = await reportsService.searchReportsForCitizen(filters, req.user.id, page, limit);
    } else {
      result = await reportsService.searchReports(filters, page, limit);
    }
    res.json(result);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const publicSearch = async (req, res) => {
  try {
    const { phoneNumber, email, bankAccount, url, page, limit } = req.query;
    const filters = { phoneNumber, email, bankAccount, url };
    const result = await reportsService.searchReports(filters, page, limit);
    res.json(result);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await reportsService.getReportById(parseInt(req.params.id), req.user.role, req.user.id);
    res.json(report);
  } catch (error) {
    error.statusCode = 404;
    throw error;
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await reportsService.getPublicStats();
    res.json(stats);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};