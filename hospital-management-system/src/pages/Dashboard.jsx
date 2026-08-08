import { Row, Col, Card, Table, Badge } from 'react-bootstrap'
import { MdPeople, MdEventNote, MdReceiptLong, MdLocalHospital } from 'react-icons/md'

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
  const recentPatients = [
    { name: 'Ali Raza', dept: 'Cardiology', status: 'Admitted' },
    { name: 'Sara Khan', dept: 'Orthopedics', status: 'Discharged' },
    { name: 'Bilal Ahmed', dept: 'Neurology', status: 'Under Observation' },
    { name: 'Ayesha Noor', dept: 'Pediatrics', status: 'Admitted' },
  ]

  const statusVariant = {
    Admitted: 'success',
    Discharged: 'secondary',
    'Under Observation': 'warning',
  }

  return (
    <div>
      <h3 className="mb-4 fw-bold">Dashboard Overview</h3>

      <Row className="g-3 mb-4">
        <Col md={3} sm={6}>
          <StatCard title="Total Patients" value="1,248" icon={<MdPeople size={26} />} color="primary" />
        </Col>
        <Col md={3} sm={6}>
          <StatCard title="Appointments Today" value="42" icon={<MdEventNote size={26} />} color="success" />
        </Col>
        <Col md={3} sm={6}>
          <StatCard title="Pending Bills" value="17" icon={<MdReceiptLong size={26} />} color="warning" />
        </Col>
        <Col md={3} sm={6}>
          <StatCard title="Doctors Available" value="9" icon={<MdLocalHospital size={26} />} color="info" />
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-bold">Recent Patients</Card.Header>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.dept}</td>
                      <td>
                        <Badge bg={statusVariant[p.status]}>{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-bold">Quick Summary</Card.Header>
            <Card.Body>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                <li className="d-flex justify-content-between">
                  <span>ICU Beds Available</span> <strong>5 / 20</strong>
                </li>
                <li className="d-flex justify-content-between">
                  <span>General Beds Available</span> <strong>34 / 60</strong>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Surgeries Scheduled</span> <strong>4</strong>
                </li>
                <li className="d-flex justify-content-between">
                  <span>Staff On Duty</span> <strong>58</strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard