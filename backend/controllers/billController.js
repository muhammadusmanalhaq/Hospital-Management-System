// controllers/billController.js

const {
  getAllBills,
  getBillById,
  getBillsByPatientId,
  createBill,
  updateBillStatus,
  createPayment,
  getPaymentsByBillId,
  createInsuranceClaim,
  updateClaimStatus,
  getRevenueSummary
} = require('../models/billModel');

const getBills = async (req, res) => {
  try {
    const bills = await getAllBills();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBill = async (req, res) => {
  try {
    const bill = await getBillById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPatientBills = async (req, res) => {
  try {
    const bills = await getBillsByPatientId(req.params.patientId);
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addBill = async (req, res) => {
  try {
    const { patientId, appointmentId, consultationCharge, labCharge, medicineCharge, hospitalCharge } = req.body;
    const billId = await createBill({ patientId, appointmentId, consultationCharge, labCharge, medicineCharge, hospitalCharge });
    res.status(201).json({ message: 'Bill created successfully', billId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const changeBillStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bill = await getBillById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    await updateBillStatus(req.params.id, status);
    res.status(200).json({ message: 'Bill status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addPayment = async (req, res) => {
  try {
    const { billId, amountPaid, paymentMethod, transactionId } = req.body;

    const bill = await getBillById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const paymentId = await createPayment({ billId, amountPaid, paymentMethod, transactionId });

    const existingPayments = await getPaymentsByBillId(billId);
    const totalPaid = existingPayments.reduce((sum, p) => sum + Number(p.amount_paid), 0);

    if (totalPaid >= Number(bill.total_amount)) {
      await updateBillStatus(billId, 'paid');
    } else {
      await updateBillStatus(billId, 'partially_paid');
    }

    res.status(201).json({ message: 'Payment recorded successfully', paymentId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBillPayments = async (req, res) => {
  try {
    const payments = await getPaymentsByBillId(req.params.billId);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addInsuranceClaim = async (req, res) => {
  try {
    const { billId, patientId, insuranceProvider, policyNumber, claimAmount } = req.body;
    const claimId = await createInsuranceClaim({ billId, patientId, insuranceProvider, policyNumber, claimAmount });
    res.status(201).json({ message: 'Insurance claim submitted successfully', claimId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const changeClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await updateClaimStatus(req.params.claimId, status);
    res.status(200).json({ message: 'Claim status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRevenueReport = async (req, res) => {
  try {
    const summary = await getRevenueSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getBills,
  getBill,
  getPatientBills,
  addBill,
  changeBillStatus,
  addPayment,
  getBillPayments,
  addInsuranceClaim,
  changeClaimStatus,
  getRevenueReport
};