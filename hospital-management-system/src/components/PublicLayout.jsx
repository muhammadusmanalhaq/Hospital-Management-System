import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/landing.css';

const PublicLayout = ({ children }) => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <span className="logo-icon">+</span>
            CareInFlow<span>.co</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className={getNavLinkClass('/')}>Home</Link>
            <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
            <Link to="/doctors" className={getNavLinkClass('/doctors')}>Doctors</Link>
            <Link to="/appointment" className={getNavLinkClass('/appointment')}>Appointment</Link>
            <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      {children}

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-about">
            <Link to="/" className="logo footer-logo">
              <span className="logo-icon">+</span>
              CareInFlow<span>.co</span>
            </Link>
            <p>Smart healthcare management for a better and healthier tomorrow.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/appointment">Appointment</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-links">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgotpassword">Forgot Password</Link>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📍 Pakistan</p>
            <p>📞 +92 300 1234567</p>
            <p>✉ info@careinflow.co</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CareInFlow.co. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;
