import { Table, Card, Button, Badge } from 'react-bootstrap'

function Billing() {
  const bills = [
    { id: 1, patient: 'Ali Raza', amount: 15200, date: '2026-07-10', status: 'Paid' },
    { id: 2, patient: 'Sara Khan', amount: 8400, date: '2026-07-12', status: 'Pending' },
    { id: 3, patient: 'Bilal Ahmed', amount: 22000, date: '2026-07-14', status: 'Overdue' },
  ]

  const statusVariant = {
    Paid: 'success',
    Pending: 'warning',
    Overdue: 'danger',
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold mb-0">Billing</h3>
        <Button variant="primary">+ Generate Invoice</Button>
      </div>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient</th>
                <th>Amount (PKR)</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.patient}</td>
                  <td>{b.amount.toLocaleString()}</td>
                  <td>{b.date}</td>
                  <td><Badge bg={statusVariant[b.status]}>{b.status}</Badge></td>
                  <td>
                    <Button size="sm" variant="outline-secondary">View</Button>
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

export default Billing