import { Table, Card, Button, Badge } from 'react-bootstrap'

function Patients() {
  const patients = [
    { id: 1, name: 'Ali Raza', age: 34, gender: 'Male', dept: 'Cardiology', status: 'Admitted' },
    { id: 2, name: 'Sara Khan', age: 28, gender: 'Female', dept: 'Orthopedics', status: 'Discharged' },
    { id: 3, name: 'Bilal Ahmed', age: 45, gender: 'Male', dept: 'Neurology', status: 'Under Observation' },
  ]

  const statusVariant = {
    Admitted: 'success',
    Discharged: 'secondary',
    'Under Observation': 'warning',
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Patient Records</h3>
        <Button variant="primary">+ Add Patient</Button>
      </div>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.dept}</td>
                  <td><Badge bg={statusVariant[p.status]}>{p.status}</Badge></td>
                  <td>
                    <Button size="sm" variant="outline-primary" className="me-2">Edit</Button>
                    <Button size="sm" variant="outline-danger">Delete</Button>
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

export default Patients