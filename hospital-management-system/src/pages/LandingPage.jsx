import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">Smart Healthcare Management</span>
            <h1>
              Your Health,
              <span>Our Priority.</span>
            </h1>
            <p>
              CareInFlow.co provides a modern and reliable
              healthcare management experience for patients,
              doctors and hospital staff.
            </p>
            <div className="hero-buttons">
              <Link to="/appointment" className="btn-primary">
                Book Appointment
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-features">
              <div>
                <strong>24/7</strong>
                <small>Support</small>
              </div>
              <div>
                <strong>100+</strong>
                <small>Doctors</small>
              </div>
              <div>
                <strong>5K+</strong>
                <small>Patients</small>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-card">
              {/* Fallback to hero.png if doctor.png is missing */}
              <img src="/src/assets/images/hero.png" alt="CareInFlow Healthcare Doctor" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services">
        <div className="container">
          <div className="section-heading">
            <span>OUR SERVICES</span>
            <h2>Healthcare Made Simple</h2>
            <p>Everything you need to manage your healthcare journey in one place.</p>
          </div>
          <div className="service-container">
            <div className="service-card">
              <div className="service-icon">🩺</div>
              <h3>Doctor Consultation</h3>
              <p>Connect with qualified and experienced doctors for professional medical guidance.</p>
              <Link to="/doctors">Find a Doctor →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h3>Online Appointment</h3>
              <p>Schedule your appointment quickly and conveniently without unnecessary waiting.</p>
              <Link to="/appointment">Book Now →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🚑</div>
              <h3>Emergency Care</h3>
              <p>Access reliable healthcare support whenever you need it, day or night.</p>
              <Link to="/contact">Contact Us →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Hospital Management</h3>
              <p>Efficient management of patients, doctors, appointments and hospital operations.</p>
              <Link to="/login">Get Started →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-section">
        <div className="container about-container">
          <div className="about-image">
            <div style={{width: '100%', height: '100%', backgroundColor: '#e2f0ed', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888'}}>
              [hospital.jpg]
            </div>
          </div>
          <div className="about-content">
            <span className="section-label">ABOUT CAREINFLOW.CO</span>
            <h2>
              Modern Healthcare,
              <span>Better Experience.</span>
            </h2>
            <p>
              CareInFlow.co is designed to simplify hospital
              management and improve the healthcare experience
              for everyone.
            </p>
            <p>
              From patient appointments to doctor management,
              our system brings important healthcare services
              together in one easy-to-use platform.
            </p>
            <div className="about-points">
              <div>✓ Easy Appointment Management</div>
              <div>✓ Professional Doctor Profiles</div>
              <div>✓ Secure Patient Management</div>
              <div>✓ Efficient Hospital Operations</div>
            </div>
            <Link to="/about" className="btn-primary">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-us">
        <div className="container">
          <div className="section-heading">
            <span>WHY CAREINFLOW.CO?</span>
            <h2>Healthcare You Can Trust</h2>
          </div>
          <div className="why-container">
            <div className="why-card">
              <div className="why-icon">👨‍⚕️</div>
              <h3>Experienced Doctors</h3>
              <p>Access professional healthcare providers with experience and expertise.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⚡</div>
              <h3>Fast & Easy</h3>
              <p>Manage appointments and healthcare services quickly from one platform.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🔒</div>
              <h3>Secure System</h3>
              <p>Designed to provide a safe and organized healthcare management experience.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">❤️</div>
              <h3>Patient Focused</h3>
              <p>Our system puts patients and their healthcare needs first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <span>NEED MEDICAL ASSISTANCE?</span>
            <h2>Take Control of Your Healthcare Today.</h2>
            <p>
              Book an appointment with our healthcare professionals and experience simpler healthcare management.
            </p>
            <Link to="/appointment" className="cta-button">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
