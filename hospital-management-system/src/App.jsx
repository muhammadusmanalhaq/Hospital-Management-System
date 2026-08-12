import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointment from './pages/Appointment'
import Billing from './pages/Billing'
import Login from './pages/Login'
import AIChatbot from './pages/AIChatbot'
import { useAuth } from './context/AuthContext'
import './App.css'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role_id)) return <Navigate to="/" />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="app-wrapper">
      {user && <Navbar />}
      <div className="app-body">
        {user && <Sidebar />}
        <main className={user ? "main-content" : "w-100"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/patients" element={<ProtectedRoute allowedRoles={[1, 2]}><Patients /></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute allowedRoles={[1, 2, 3]}><Appointment /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute allowedRoles={[1]}><Billing /></ProtectedRoute>} />
            <Route path="/ai-chatbot" element={<ProtectedRoute allowedRoles={[1, 2, 3]}><AIChatbot /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App