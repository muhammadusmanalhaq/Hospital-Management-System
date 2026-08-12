import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdPeople, MdEventNote, MdReceiptLong, MdChatBubble } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'

// role_id: 1 = Admin, 2 = Doctor, 3 = Patient

function Sidebar() {
  const { user } = useAuth()
  const role = user?.role_id

  const allLinks = [
    { to: '/',             label: 'Dashboard',    icon: <MdDashboard size={20} />,  end: true, roles: [1, 2, 3] },
    { to: '/patients',     label: 'Patients',     icon: <MdPeople size={20} />,               roles: [1, 2] },
    { to: '/appointments', label: 'Appointments', icon: <MdEventNote size={20} />,             roles: [1, 2, 3] },
    { to: '/billing',      label: 'Billing',      icon: <MdReceiptLong size={20} />,           roles: [1] },
    { to: '/ai-chatbot',   label: 'AI Assistant', icon: <MdChatBubble size={20} />,            roles: [1, 2, 3] },
  ]

  const links = allLinks.filter(l => l.roles.includes(role))

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