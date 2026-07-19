import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdPeople, MdEventNote, MdReceiptLong } from 'react-icons/md'

function Sidebar() {
  const links = [
    { to: '/', label: 'Dashboard', icon: <MdDashboard size={20} />, end: true },
    { to: '/patients', label: 'Patients', icon: <MdPeople size={20} /> },
    { to: '/appointments', label: 'Appointments', icon: <MdEventNote size={20} /> },
    { to: '/billing', label: 'Billing', icon: <MdReceiptLong size={20} /> },
  ]

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </Nav>
    </div>
  )
}

export default Sidebar