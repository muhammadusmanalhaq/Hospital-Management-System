// controllers/patientController.js

const bcrypt = require('bcrypt');
const {
  getAllPatients,
  getPatientById,
  createPatientWithUser,
  updatePatient,
  deletePatient,
  findUserByEmailForPatient
} = require('../models/patientModel');

const getPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, bloodGroup, address, emergencyContact } = req.body;

    const existingUser = await findUserByEmailForPatient(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createPatientWithUser(
      { name, email, hashedPassword, phone },
      { dateOfBirth, gender, bloodGroup, address, emergencyContact }
    );

    res.status(201).json({ message: 'Patient created successfully', ...result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editPatient = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await updatePatient(req.params.id, req.body);
    res.status(200).json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removePatient = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await deletePatient(req.params.id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPatients, getPatient, createPatient, editPatient, removePatient };