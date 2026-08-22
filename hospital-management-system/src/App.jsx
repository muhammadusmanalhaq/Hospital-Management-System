import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import PublicLayout from './components/PublicLayout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointment from './pages/Appointment'
import PublicAppointment from './pages/PublicAppointment'
import Billing from './pages/Billing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AIChatbot from './pages/AIChatbot'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import DoctorsPublic from './pages/DoctorsPublic'
import Contact from './pages/Contact'
import { useAuth } from './context/AuthContext'
import './App.css'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role_id)) return <Navigate to="/dashboard" />;
  return children;
};

// Layout for the authenticated app
const AppLayout = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes with Public Layout */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/about" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><About /></PublicLayout>} />
      <Route path="/doctors" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><DoctorsPublic /></PublicLayout>} />
      <Route path="/contact" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><Contact /></PublicLayout>} />
      <Route path="/appointment" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><PublicAppointment /></PublicLayout>} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><Login /></PublicLayout>} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><SignUp /></PublicLayout>} />

      {/* Protected Routes with App Layout */}
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute allowedRoles={[1, 2]}><AppLayout><Patients /></AppLayout></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute allowedRoles={[1, 2, 3]}><AppLayout><Appointment /></AppLayout></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute allowedRoles={[1]}><AppLayout><Billing /></AppLayout></ProtectedRoute>} />
      <Route path="/ai-chatbot" element={<ProtectedRoute allowedRoles={[1, 2, 3]}><AppLayout><AIChatbot /></AppLayout></ProtectedRoute>} />
    </Routes>
  )
}

export default App