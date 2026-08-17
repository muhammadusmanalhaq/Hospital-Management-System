import { useState, useRef, useEffect } from 'react'
import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { FaHospitalAlt, FaBell, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AppNavbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleLabel = user?.role_id === 1 ? 'Admin' : user?.role_id === 2 ? 'Doctor' : 'Patient'

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

          {/* User dropdown */}
          <div className="position-relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-dark d-flex align-items-center gap-2 border-0 p-0"
              style={{ cursor: 'pointer' }}
            >
              <FaUserCircle size={22} />
              <span className="text-light fw-semibold">{user?.name || 'Admin'}</span>
              <FaChevronDown size={12} className="text-secondary" />
            </button>

            {dropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded-3 border-0 py-1"
                style={{ right: 0, top: '110%', minWidth: '200px', zIndex: 9999 }}
              >
                {/* User info header */}
                <div className="px-3 py-2 border-bottom">
                  <div className="fw-bold text-dark small">{user?.name || 'Admin'}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user?.email}</div>
                  <span
                    className="badge mt-1"
                    style={{ backgroundColor: '#0d6efd', fontSize: '0.7rem' }}
                  >
                    {roleLabel}
                  </span>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="btn btn-link w-100 text-start text-danger d-flex align-items-center gap-2 px-3 py-2"
                  style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AppNavbar