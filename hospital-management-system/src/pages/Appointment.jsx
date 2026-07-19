import { Table, Card, Button, Badge } from 'react-bootstrap'

function Appointment() {
  const appointments = [
    { id: 1, patient: 'Ali Raza', doctor: 'Dr. Fatima', date: '2026-07-17', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Sara Khan', doctor: 'Dr. Zubair', date: '2026-07-17', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Bilal Ahmed', doctor: 'Dr. Amna', date: '2026-07-18', time: '09:15 AM', status: 'Cancelled' },
  ]

  const statusVariant = {
    Confirmed: 'success',
    Pending: 'warning',
    Cancelled: 'danger',
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Appointments</h3>
        <Button variant="primary">+ New Appointment</Button>
      </div>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.patient}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td><Badge bg={statusVariant[a.status]}>{a.status}</Badge></td>
                  <td>
                    <Button size="sm" variant="outline-primary">Reschedule</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Appointment