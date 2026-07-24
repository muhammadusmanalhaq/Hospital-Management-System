// controllers/doctorController.js

const bcrypt = require('bcrypt');
const {
  getAllDoctors,
  getDoctorById,
  createDoctorWithUser,
  updateDoctor,
  deleteDoctor,
  findUserByEmailForDoctor,
  getScheduleByDoctorId,
  addScheduleSlot,
  deleteScheduleSlot
} = require('../models/doctorModel');

const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, departmentId, specialization, qualification, experienceYears, consultationFee } = req.body;

    const existingUser = await findUserByEmailForDoctor(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createDoctorWithUser(
      { name, email, hashedPassword, phone },
      { departmentId, specialization, qualification, experienceYears, consultationFee }
    );

    res.status(201).json({ message: 'Doctor created successfully', ...result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editDoctor = async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await updateDoctor(req.params.id, req.body);
    res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeDoctor = async (req, res) => {
  try {
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await deleteDoctor(req.params.id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getDoctorSchedule = async (req, res) => {
  try {
    const schedule = await getScheduleByDoctorId(req.params.id);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createScheduleSlot = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const scheduleId = await addScheduleSlot(req.params.id, dayOfWeek, startTime, endTime);
    res.status(201).json({ message: 'Schedule slot added successfully', scheduleId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeScheduleSlot = async (req, res) => {
  try {
    await deleteScheduleSlot(req.params.scheduleId);
    res.status(200).json({ message: 'Schedule slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  editDoctor,
  removeDoctor,
  getDoctorSchedule,
  createScheduleSlot,
  removeScheduleSlot
};