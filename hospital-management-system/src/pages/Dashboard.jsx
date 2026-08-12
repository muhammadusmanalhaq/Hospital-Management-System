import { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap'
import { MdPeople, MdEventNote, MdReceiptLong, MdLocalHospital } from 'react-icons/md'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function StatCard({ title, value, icon, color }) {
  return (
    <Card className="stat-card shadow-sm border-0">
      <Card.Body className="d-flex align-items-center gap-3">
        <div className={`stat-icon bg-${color}`}>{icon}</div>
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
        </div>
      </Card.Body>
    </Card>
  )
}

function Dashboard() {
  const { user } = useAuth()
  const role = user?.role_id // 1=Admin, 2=Doctor, 3=Patient

  const [stats, setStats] = useState({ patients: 0, appointments: 0, bills: 0, doctors: 0 })
  const [recentPatients, setRecentPatients] = useState([])
  const [myAppointments, setMyAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { fetchDashboardData() }, [])

  const fetchDashboardData = async () => {
    try {
      if (role === 1) {
        // Admin — fetch everything
        const [patientsRes, apptsRes, billsRes, docsRes] = await Promise.all([
          api.get('/patients'),
          api.get('/appointments'),
          api.get('/bills'),
          api.get('/doctors')
        ])
        setStats({
          patients: patientsRes.data.length,
          appointments: apptsRes.data.length,
          bills: billsRes.data.filter(b => b.status === 'pending').length,
          doctors: docsRes.data.length
        })
        setRecentPatients(patientsRes.data.slice(0, 5))

      } else if (role === 2) {
        // Doctor — only patients and their appointments
        const [patientsRes, apptsRes, docsRes] = await Promise.all([
          api.get('/patients'),
          api.get('/appointments'),
          api.get('/doctors')
        ])
        setStats({
          patients: patientsRes.data.length,
          appointments: apptsRes.data.length,
          bills: 0,
          doctors: docsRes.data.length
        })
        setRecentPatients(patientsRes.data.slice(0, 5))

      } else if (role === 3) {
        // Patient — only their own appointments
        const apptsRes = await api.get('/appointments')
        setMyAppointments(apptsRes.data.slice(0, 5))
        setStats({ patients: 0, appointments: apptsRes.data.length, bills: 0, doctors: 0 })
      }
    } catch (err) {
      setError('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>

  return (
    <div>
      <h3 className="mb-4 fw-bold">Dashboard Overview</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Stats — show relevant ones per role */}
      <Row className="g-3 mb-4">
        {(role === 1 || role === 2) && (
          <Col md={3} sm={6}>
            <StatCard title="Total Patients" value={stats.patients} icon={<MdPeople size={26} />} color="primary" />
          </Col>
        )}
        <Col md={3} sm={6}>
          <StatCard title="Appointments" value={stats.appointments} icon={<MdEventNote size={26} />} color="success" />
        </Col>
        {role === 1 && (
          <Col md={3} sm={6}>
            <StatCard title="Pending Bills" value={stats.bills} icon={<MdReceiptLong size={26} />} color="warning" />
          </Col>
        )}
        {(role === 1 || role === 2) && (
          <Col md={3} sm={6}>
            <StatCard title="Doctors Available" value={stats.doctors} icon={<MdLocalHospital size={26} />} color="info" />
          </Col>
        )}
      </Row>

      <Row className="g-3">
        {/* Admins and Doctors see recent patients */}
        {(role === 1 || role === 2) && (
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white fw-bold">Recent Patients</Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr><th>Name</th><th>Contact</th><th>Gender</th></tr>
                  </thead>
                  <tbody>
                    {recentPatients.length > 0 ? recentPatients.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.phone}</td>
                        <td>{p.gender}</td>
                      </tr>
                    )) : <tr><td colSpan="3" className="text-center text-muted p-3">No patients yet.</td></tr>}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Patients see their own upcoming appointments */}
        {role === 3 && (
          <Col md={8}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white fw-bold">My Appointments</Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr><th>Doctor</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {myAppointments.length > 0 ? myAppointments.map((a, i) => (
                      <tr key={i}>
                        <td>{a.doctor_name || 'N/A'}</td>
                        <td>{a.appointment_date ? new Date(a.appointment_date).toLocaleDateString() : 'N/A'}</td>
                        <td>{a.status}</td>
                      </tr>
                    )) : <tr><td colSpan="3" className="text-center text-muted p-3">No appointments yet.</td></tr>}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* Quick summary panel — only admin */}
        {role === 1 && (
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white fw-bold">Quick Summary</Card.Header>
              <Card.Body>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  <li className="d-flex justify-content-between"><span>ICU Beds Available</span> <strong>5 / 20</strong></li>
                  <li className="d-flex justify-content-between"><span>General Beds Available</span> <strong>34 / 60</strong></li>
                  <li className="d-flex justify-content-between"><span>Surgeries Scheduled</span> <strong>4</strong></li>
                  <li className="d-flex justify-content-between"><span>Staff On Duty</span> <strong>58</strong></li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Dashboard