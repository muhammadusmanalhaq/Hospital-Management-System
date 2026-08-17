import { useState, useEffect } from 'react'
import { Table, Card, Button, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap'
import api from '../services/api'

function Appointment() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', status: 'pending', reason: '' })

  useEffect(() => { fetchAppointments() }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const res = await api.get('/appointments')
      setAppointments(res.data)
    } catch {
      setError('Failed to fetch appointments.')
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setSelectedAppt(null)
    setForm({ patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', status: 'pending', reason: '' })
    setShowModal(true)
  }

  const openReschedule = (a) => {
    setSelectedAppt(a)
    setForm({
      patientId: a.patient_id,
      doctorId: a.doctor_id,
      appointmentDate: a.appointment_date ? a.appointment_date.substring(0, 10) : '',
      appointmentTime: a.appointment_time || '',
      status: a.status,
      reason: a.reason || ''
    })
    setShowModal(true)
  }

  const openView = (a) => { setSelectedAppt(a); setShowViewModal(true) }
  const openDelete = (a) => { setSelectedAppt(a); setShowDeleteModal(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (selectedAppt) {
        await api.put(`/appointments/${selectedAppt.appointment_id}`, form)
      } else {
        await api.post('/appointments', form)
      }
      setShowModal(false)
      fetchAppointments()
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/appointments/${selectedAppt.appointment_id}`)
      setShowDeleteModal(false)
      fetchAppointments()
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.')
    }
  }

  const statusVariant = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Appointments</h3>
        <Button variant="primary" onClick={openAdd}>+ New Appointment</Button>
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
                  <th>ID</th><th>Patient ID</th><th>Doctor ID</th><th>Date</th><th>Time</th><th>Status</th><th>Reason</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? appointments.map((a) => (
                  <tr key={a.appointment_id}>
                    <td>{a.appointment_id}</td>
                    <td>{a.patient_id}</td>
                    <td>{a.doctor_id}</td>
                    <td>{a.appointment_date ? new Date(a.appointment_date).toLocaleDateString() : '—'}</td>
                    <td>{a.appointment_time}</td>
                    <td><Badge bg={statusVariant[a.status] || 'secondary'}>{a.status}</Badge></td>
                    <td>{a.reason || '—'}</td>
                    <td>
                      <Button size="sm" variant="outline-info" className="me-1" onClick={() => openView(a)}>View</Button>
                      <Button size="sm" variant="outline-primary" className="me-1" onClick={() => openReschedule(a)}>Reschedule</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => openDelete(a)}>Cancel</Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="8" className="text-center p-4">No appointments found.</td></tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAppt ? 'Reschedule Appointment' : 'New Appointment'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-6"><Form.Label>Patient ID</Form.Label><Form.Control type="number" required value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Doctor ID</Form.Label><Form.Control type="number" required value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Date</Form.Label><Form.Control type="date" required value={form.appointmentDate} onChange={e => setForm({ ...form, appointmentDate: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Time</Form.Label><Form.Control type="time" required value={form.appointmentTime} onChange={e => setForm({ ...form, appointmentTime: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Status</Form.Label>
                <Form.Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                </Form.Select>
              </div>
              <div className="col-12"><Form.Label>Reason</Form.Label><Form.Control as="textarea" rows={2} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} /></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={saving}>{saving ? 'Saving...' : (selectedAppt ? 'Update' : 'Book Appointment')}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton><Modal.Title>Appointment Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedAppt && (
            <table className="table table-sm table-bordered mb-0">
              <tbody>
                <tr><th>ID</th><td>{selectedAppt.appointment_id}</td></tr>
                <tr><th>Patient ID</th><td>{selectedAppt.patient_id}</td></tr>
                <tr><th>Doctor ID</th><td>{selectedAppt.doctor_id}</td></tr>
                <tr><th>Date</th><td>{selectedAppt.appointment_date ? new Date(selectedAppt.appointment_date).toLocaleDateString() : '—'}</td></tr>
                <tr><th>Time</th><td>{selectedAppt.appointment_time}</td></tr>
                <tr><th>Status</th><td><Badge bg={statusVariant[selectedAppt.status] || 'secondary'}>{selectedAppt.status}</Badge></td></tr>
                <tr><th>Reason</th><td>{selectedAppt.reason || '—'}</td></tr>
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      {/* Delete/Cancel Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton><Modal.Title>Cancel Appointment</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to cancel appointment <strong>#{selectedAppt?.appointment_id}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Back</Button>
          <Button variant="danger" onClick={handleDelete}>Cancel Appointment</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Appointment