import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <main className="login-section" style={{ minHeight: '78vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px', background: '#f4f8fc' }}>
      <style>{`
        .login-container {
            width: 100%;
            max-width: 480px;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-icon {
            font-size: 50px;
        }
        .login-header h1 {
            margin: 10px 0;
            color: #123;
        }
        .login-header p {
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
        .form-group input {
            width: 100%;
            padding: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box;
        }
        .login-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 15px;
        }
        .login-options a {
            color: #0d6efd;
            text-decoration: none;
        }
        .login-btn {
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
        .login-btn:hover {
            background: #0b5ed7;
        }
        .login-btn:disabled {
            background: #8ab4f8;
            cursor: not-allowed;
        }
        .login-message {
            text-align: center;
            margin-top: 15px;
            font-weight: bold;
        }
        .signup-link {
            text-align: center;
            margin-top: 25px;
        }
        .signup-link a {
            color: #0d6efd;
            text-decoration: none;
            font-weight: bold;
        }
        @media (max-width: 700px) {
            .login-container {
                padding: 25px;
            }
        }
      `}</style>
      
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">🏥</div>
          <h1>Welcome Back</h1>
          <p>Login to your CareInFlow.co account</p>
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" id="remember" style={{ marginRight: '5px', width: 'auto' }} />
              Remember me
            </label>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && (
            <p className="login-message" style={{ color: 'red' }}>
              {error}
            </p>
          )}
        </form>

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
