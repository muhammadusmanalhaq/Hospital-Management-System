import { useState, useEffect } from 'react'
import { Table, Card, Button, Badge, Spinner, Alert, Modal, Form } from 'react-bootstrap'
import api from '../services/api'

function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', dateOfBirth: '', gender: 'male', bloodGroup: '', address: '', emergencyContact: '' })

  useEffect(() => { fetchPatients() }, [])

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const res = await api.get('/patients')
      setPatients(res.data)
    } catch {
      setError('Failed to fetch patients.')
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setSelectedPatient(null)
    setForm({ name: '', email: '', password: '', phone: '', dateOfBirth: '', gender: 'male', bloodGroup: '', address: '', emergencyContact: '' })
    setShowModal(true)
  }

  const openEdit = (p) => {
    setSelectedPatient(p)
    setForm({ name: p.name || '', email: p.email || '', password: '', phone: p.phone || '', dateOfBirth: p.date_of_birth ? p.date_of_birth.substring(0, 10) : '', gender: p.gender || 'male', bloodGroup: p.blood_group || '', address: p.address || '', emergencyContact: p.emergency_contact || '' })
    setShowModal(true)
  }

  const openView = (p) => { setSelectedPatient(p); setShowViewModal(true) }
  const openDelete = (p) => { setSelectedPatient(p); setShowDeleteModal(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (selectedPatient) {
        await api.put(`/patients/${selectedPatient.patient_id}`, form)
      } else {
        await api.post('/patients', form)
      }
      setShowModal(false)
      fetchPatients()
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/patients/${selectedPatient.patient_id}`)
      setShowDeleteModal(false)
      fetchPatients()
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Patient Records</h3>
        <Button variant="primary" onClick={openAdd}>+ Add Patient</Button>
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
                  <th>ID</th><th>Name</th><th>Phone</th><th>Gender</th><th>Blood Group</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? patients.map((p) => (
                  <tr key={p.patient_id}>
                    <td>{p.patient_id}</td>
                    <td>{p.name}</td>
                    <td>{p.phone || '—'}</td>
                    <td>{p.gender || '—'}</td>
                    <td>{p.blood_group || '—'}</td>
                    <td>
                      <Button size="sm" variant="outline-info" className="me-1" onClick={() => openView(p)}>View</Button>
                      <Button size="sm" variant="outline-primary" className="me-1" onClick={() => openEdit(p)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => openDelete(p)}>Delete</Button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6" className="text-center p-4">No patients found.</td></tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-6"><Form.Label>Full Name</Form.Label><Form.Control required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Email</Form.Label><Form.Control type="email" required={!selectedPatient} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              {!selectedPatient && <div className="col-md-6"><Form.Label>Password</Form.Label><Form.Control type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>}
              <div className="col-md-6"><Form.Label>Phone</Form.Label><Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Date of Birth</Form.Label><Form.Control type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Gender</Form.Label>
                <Form.Select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                </Form.Select>
              </div>
              <div className="col-md-6"><Form.Label>Blood Group</Form.Label><Form.Control placeholder="e.g. O+" value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} /></div>
              <div className="col-md-6"><Form.Label>Emergency Contact</Form.Label><Form.Control value={form.emergencyContact} onChange={e => setForm({ ...form, emergencyContact: e.target.value })} /></div>
              <div className="col-12"><Form.Label>Address</Form.Label><Form.Control as="textarea" rows={2} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={saving}>{saving ? 'Saving...' : (selectedPatient ? 'Update Patient' : 'Add Patient')}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton><Modal.Title>Patient Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <table className="table table-sm table-bordered mb-0">
              <tbody>
                <tr><th>ID</th><td>{selectedPatient.patient_id}</td></tr>
                <tr><th>Name</th><td>{selectedPatient.name}</td></tr>
                <tr><th>Email</th><td>{selectedPatient.email}</td></tr>
                <tr><th>Phone</th><td>{selectedPatient.phone || '—'}</td></tr>
                <tr><th>Gender</th><td>{selectedPatient.gender || '—'}</td></tr>
                <tr><th>Blood Group</th><td>{selectedPatient.blood_group || '—'}</td></tr>
                <tr><th>Date of Birth</th><td>{selectedPatient.date_of_birth ? new Date(selectedPatient.date_of_birth).toLocaleDateString() : '—'}</td></tr>
                <tr><th>Address</th><td>{selectedPatient.address || '—'}</td></tr>
                <tr><th>Emergency Contact</th><td>{selectedPatient.emergency_contact || '—'}</td></tr>
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button></Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete <strong>{selectedPatient?.name}</strong>? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Patient</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Patients