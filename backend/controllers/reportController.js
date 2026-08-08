// controllers/reportController.js

const path = require('path');
const {
  getReportsByPatientId,
  getReportById,
  createReport,
  deleteReport
} = require('../models/reportModel');

const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { patientId, doctorId, reportType } = req.body;
    const filePath = req.file.path;

    const reportId = await createReport({ patientId, doctorId, reportType, filePath });
    res.status(201).json({ message: 'Report uploaded successfully', reportId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPatientReports = async (req, res) => {
  try {
    const reports = await getReportsByPatientId(req.params.patientId);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const downloadReport = async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.download(path.resolve(report.file_path));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeReport = async (req, res) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    await deleteReport(req.params.id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { uploadReport, getPatientReports, downloadReport, removeReport };