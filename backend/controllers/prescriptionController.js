// controllers/prescriptionController.js

const {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../models/prescriptionModel');

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPrescription = async (req, res) => {
  try {
    const prescription = await getPrescriptionById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, dosageInstructions, notes } = req.body;
    const prescriptionId = await createPrescription({ appointmentId, medicines, dosageInstructions, notes });
    res.status(201).json({ message: 'Prescription created successfully', prescriptionId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editPrescription = async (req, res) => {
  try {
    const prescription = await getPrescriptionById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    await updatePrescription(req.params.id, req.body);
    res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removePrescription = async (req, res) => {
  try {
    const prescription = await getPrescriptionById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    await deletePrescription(req.params.id);
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPrescriptions, getPrescription, addPrescription, editPrescription, removePrescription };