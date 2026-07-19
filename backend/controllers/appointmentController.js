// controllers/appointmentController.js

const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../models/appointmentModel');

const getAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime, status, reason } = req.body;
    const appointmentId = await createAppointment({ patientId, doctorId, appointmentDate, appointmentTime, status, reason });
    res.status(201).json({ message: 'Appointment created successfully', appointmentId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const editAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await updateAppointment(req.params.id, req.body);
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const removeAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await deleteAppointment(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAppointments, getAppointment, addAppointment, editAppointment, removeAppointment };