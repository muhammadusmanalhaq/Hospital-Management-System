import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/landing.css';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <style>{`
        /* ======== MOBILE NAV ======== */
        .pub-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .pub-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #102a43;
          border-radius: 2px;
          transition: 0.3s;
        }
        .pub-mobile-menu {
          display: none;
          flex-direction: column;
          background: white;
          border-top: 1px solid #edf2f7;
          padding: 16px 20px;
          gap: 14px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .pub-mobile-menu.open {
          display: flex;
        }
        .pub-mobile-menu a {
          color: #486581;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid #edf2f7;
        }
        .pub-mobile-menu a:last-child {
          border-bottom: none;
        }
        .pub-mobile-menu a.login-btn {
          color: #087f8c;
          border: 1px solid #087f8c;
          border-radius: 8px;
          padding: 10px 16px;
          text-align: center;
        }
        .pub-mobile-menu a.signup-btn {
          background: #087f8c;
          color: white;
          border-radius: 8px;
          padding: 10px 16px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .pub-hamburger { display: flex !important; }
          .pub-desktop-nav { display: none !important; }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <span className="logo-icon">+</span>
            CareInFlow<span>.co</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links pub-desktop-nav">
            <Link to="/" className={getNavLinkClass('/')}>Home</Link>
            <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
            <Link to="/doctors" className={getNavLinkClass('/doctors')}>Doctors</Link>
            <Link to="/appointment" className={getNavLinkClass('/appointment')}>Appointment</Link>
            <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </nav>

          {/* Hamburger */}
          <button
            className="pub-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`pub-mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/doctors" onClick={() => setMenuOpen(false)}>Doctors</Link>
          <Link to="/appointment" onClick={() => setMenuOpen(false)}>Appointment</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
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
