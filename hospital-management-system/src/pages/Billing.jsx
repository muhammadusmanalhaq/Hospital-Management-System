import { useState, useEffect } from 'react'
import { Table, Card, Button, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap'
import api from '../services/api'

function Billing() {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [payments, setPayments] = useState([])
  const [saving, setSaving] = useState(false)
  const [newBill, setNewBill] = useState({ patient_id: '', consultation_charge: 0, lab_charge: 0, medicine_charge: 0, hospital_charge: 0 })
  const [payForm, setPayForm] = useState({ billId: '', amountPaid: '', paymentMethod: 'cash', transactionId: '' })

  useEffect(() => { fetchBills() }, [])

  const fetchBills = async () => {
    setLoading(true)
    try {
      const res = await api.get('/bills')
      setBills(res.data)
    } catch {
      setError('Failed to fetch billing data.')
    } finally {
      setLoading(false)
    }
  }

  const openView = async (b) => {
    setSelectedBill(b)
    try {
      const res = await api.get(`/bills/${b.bill_id}/payments`)
      setPayments(res.data)
    } catch { setPayments([]) }
    setShowViewModal(true)
  }

  const openPay = (b) => {
    setSelectedBill(b)
    setPayForm({ billId: b.bill_id, amountPaid: '', paymentMethod: 'cash', transactionId: '' })
    setShowPayModal(true)
  }

  const handleCreateBill = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/bills', {
        patientId: newBill.patient_id,
        consultationCharge: newBill.consultation_charge,
        labCharge: newBill.lab_charge,
        medicineCharge: newBill.medicine_charge,
        hospitalCharge: newBill.hospital_charge
      })
      setShowModal(false)
      fetchBills()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate invoice.')
    } finally {
      setSaving(false)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/bills/payments', payForm)
      setShowPayModal(false)
      fetchBills()
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed.')
    } finally {
      setSaving(false)
    }
  }

  const statusColor = { paid: 'success', pending: 'warning', partially_paid: 'info', cancelled: 'danger' }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Billing</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Generate Invoice</Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center p-5"><Spinner animation="border" /></div>
          ) : (
            <Table hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Bill ID</th><th>Patient ID</th><th>Consultation</th><th>Lab</th><th>Medicine</th><th>Hospital</th><th>Total</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? bills.map((b) => (
                  <tr key={b.bill_id}>
                    <td>#{b.bill_id}</td>
                    <td>{b.patient_id}</td>
                    <td>${Number(b.consultation_charge || 0).toLocaleString()}</td>
                    <td>${Number(b.lab_charge || 0).toLocaleString()}</td>
                    <td>${Number(b.medicine_charge || 0).toLocaleString()}</td>
                    <td>${Number(b.hospital_charge || 0).toLocaleString()}</td>
                    <td className="fw-bold">${Number(b.total_amount || 0).toLocaleString()}</td>
                    <td><Badge bg={statusColor[b.status] || 'secondary'}>{b.status}</Badge></td>
                    <td>
                      <Button size="sm" variant="outline-info" className="me-1" onClick={() => openView(b)}>View</Button>
                      {b.status !== 'paid' && <Button size="sm" variant="outline-success" onClick={() => openPay(b)}>Pay</Button>}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="9" className="text-center p-4">No bills found.</td></tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Generate Invoice Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Generate Invoice</Modal.Title></Modal.Header>
        <Form onSubmit={handleCreateBill}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-12"><Form.Label>Patient ID</Form.Label><Form.Control type="number" required value={newBill.patient_id} onChange={e => setNewBill({ ...newBill, patient_id: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Consultation Charge ($)</Form.Label><Form.Control type="number" step="0.01" min="0" value={newBill.consultation_charge} onChange={e => setNewBill({ ...newBill, consultation_charge: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Lab Charge ($)</Form.Label><Form.Control type="number" step="0.01" min="0" value={newBill.lab_charge} onChange={e => setNewBill({ ...newBill, lab_charge: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Medicine Charge ($)</Form.Label><Form.Control type="number" step="0.01" min="0" value={newBill.medicine_charge} onChange={e => setNewBill({ ...newBill, medicine_charge: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Hospital Charge ($)</Form.Label><Form.Control type="number" step="0.01" min="0" value={newBill.hospital_charge} onChange={e => setNewBill({ ...newBill, hospital_charge: e.target.value })} /></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={saving}>{saving ? 'Generating...' : 'Generate Invoice'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Bill + Payment History Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Bill #{selectedBill?.bill_id} Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedBill && (
            <>
              <table className="table table-sm table-bordered mb-3">
                <tbody>
                  <tr><th>Patient ID</th><td>{selectedBill.patient_id}</td><th>Status</th><td><Badge bg={statusColor[selectedBill.status] || 'secondary'}>{selectedBill.status}</Badge></td></tr>
                  <tr><th>Consultation</th><td>${Number(selectedBill.consultation_charge || 0).toLocaleString()}</td><th>Lab</th><td>${Number(selectedBill.lab_charge || 0).toLocaleString()}</td></tr>
                  <tr><th>Medicine</th><td>${Number(selectedBill.medicine_charge || 0).toLocaleString()}</td><th>Hospital</th><td>${Number(selectedBill.hospital_charge || 0).toLocaleString()}</td></tr>
                  <tr><th>Total</th><td colSpan="3" className="fw-bold">${Number(selectedBill.total_amount || 0).toLocaleString()}</td></tr>
                </tbody>
              </table>
              <h6 className="fw-bold">Payment History</h6>
              {payments.length > 0 ? (
                <table className="table table-sm table-striped">
                  <thead><tr><th>Amount Paid</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {payments.map((p, i) => (
                      <tr key={i}>
                        <td>${Number(p.amount_paid).toLocaleString()}</td>
                        <td>{p.payment_method}</td>
                        <td>{new Date(p.payment_date).toLocaleDateString()}</td>
                        <td><Badge bg={p.status === 'success' ? 'success' : 'danger'}>{p.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="text-muted">No payments recorded yet.</p>}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
          {selectedBill && selectedBill.status !== 'paid' && <Button variant="success" onClick={() => { setShowViewModal(false); openPay(selectedBill) }}>Record Payment</Button>}
        </Modal.Footer>
      </Modal>

      {/* Record Payment Modal */}
      <Modal show={showPayModal} onHide={() => setShowPayModal(false)}>
        <Modal.Header closeButton><Modal.Title>Record Payment — Bill #{selectedBill?.bill_id}</Modal.Title></Modal.Header>
        <Form onSubmit={handlePayment}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-12"><Form.Label>Amount Paid ($)</Form.Label><Form.Control type="number" step="0.01" min="0.01" required value={payForm.amountPaid} onChange={e => setPayForm({ ...payForm, amountPaid: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Payment Method</Form.Label>
                <Form.Select value={payForm.paymentMethod} onChange={e => setPayForm({ ...payForm, paymentMethod: e.target.value })}>
                  <option value="cash">Cash</option><option value="card">Card</option><option value="upi">UPI</option><option value="net_banking">Net Banking</option><option value="insurance">Insurance</option>
                </Form.Select>
              </div>
              <div className="col-md-6"><Form.Label>Transaction ID (optional)</Form.Label><Form.Control value={payForm.transactionId} onChange={e => setPayForm({ ...payForm, transactionId: e.target.value })} /></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPayModal(false)}>Cancel</Button>
            <Button variant="success" type="submit" disabled={saving}>{saving ? 'Processing...' : 'Record Payment'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Billing