import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { FaHospitalAlt, FaBell, FaUserCircle } from 'react-icons/fa'

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" className="app-navbar px-3" fixed="top">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <FaHospitalAlt size={22} />
          <span className="fw-bold">Hospital Management System</span>
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-4">
          <Nav.Link className="position-relative text-light">
            <FaBell size={18} />
            <Badge bg="danger" pill className="notif-badge">3</Badge>
          </Nav.Link>
          <Nav.Link className="d-flex align-items-center gap-2 text-light">
            <FaUserCircle size={20} />
            Admin
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AppNavbar