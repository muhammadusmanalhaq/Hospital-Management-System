import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'patient'
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      setStatusMessage('Registration successful! You can now login.');
      setFormData({ name: '', email: '', phone: '', password: '', role: 'patient' });
      setTimeout(() => setStatusMessage(''), 4000);
    } else {
      setStatusMessage('Please fill all required fields.');
    }
  };

  return (
    <main className="signup-section" style={{ minHeight: '78vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px', background: '#f4f8fc' }}>
      <style>{`
        .signup-container {
            width: 100%;
            max-width: 480px;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
        }
        .signup-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .signup-icon {
            font-size: 50px;
        }
        .signup-header h1 {
            margin: 10px 0;
            color: #123;
        }
        .signup-header p {
            color: #777;
        }
        .form-group {
            margin-bottom: 18px;
        }
        .form-group label {
            display: block;
            margin-bottom: 7px;
            font-weight: bold;
        }
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .signup-btn {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 8px;
            background: #0d6efd;
            color: white;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
        }
        .signup-btn:hover {
            background: #0b5ed7;
        }
        .signup-message {
            text-align: center;
            margin-top: 15px;
            font-weight: bold;
        }
        .login-link {
            text-align: center;
            margin-top: 25px;
        }
        .login-link a {
            color: #0d6efd;
            text-decoration: none;
            font-weight: bold;
        }
        @media (max-width: 700px) {
            .signup-container {
                padding: 25px;
            }
        }
      `}</style>
      
      <div className="signup-container">
        <div className="signup-header">
          <div className="signup-icon">🏥</div>
          <h1>Create Account</h1>
          <p>Join CareInFlow.co</p>
        </div>

        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Register As</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {statusMessage && (
          <div className="signup-message" style={{ color: statusMessage.includes('successful') ? 'green' : 'red' }}>
            {statusMessage}
          </div>
        )}

        <div className="login-link">
          Already have an account? <Link to="/login">Login Here</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
