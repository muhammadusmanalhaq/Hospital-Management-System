import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main>

      {/* ================= PAGE HEADER ================= */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary, #087f8c), var(--primary-dark, #05636d))',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 15px' }}>About CareInFlow.co</h1>
          <p style={{ fontSize: '18px', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
            Delivering modern, reliable healthcare management for patients, doctors and staff.
          </p>
        </div>
      </section>

      {/* ================= MISSION + IMAGE ================= */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container about-container">
          <div className="about-image">
            <img src="/images/hospital.jpg" alt="CareInFlow Hospital" />
          </div>
          <div className="about-content">
            <span className="section-label">ABOUT CAREINFLOW.CO</span>
            <h2>
              Modern Healthcare,
              <span> Better Experience.</span>
            </h2>
            <p>
              CareInFlow.co is a comprehensive hospital management platform designed to make
              healthcare simpler, faster and more accessible for everyone.
            </p>
            <p>
              From booking appointments to managing patient records, our system brings
              all critical healthcare services under one roof — easy to use for both
              patients and medical professionals.
            </p>
            <div className="about-points">
              <div>✓ Easy Appointment Management</div>
              <div>✓ Professional Doctor Profiles</div>
              <div>✓ Secure Patient Records</div>
              <div>✓ Efficient Hospital Operations</div>
              <div>✓ 24/7 Emergency Support</div>
              <div>✓ Digital Lab Reports</div>
            </div>
            <Link to="/appointment" className="btn-primary">Book Appointment</Link>
          </div>
        </div>
      </section>

      {/* ================= MISSION / VISION / SERVICES ================= */}
      <section style={{ padding: '100px 0', background: 'var(--light, #f7fafc)' }}>
        <div className="container">
          <div className="section-heading">
            <span>OUR VALUES</span>
            <h2>What Drives Us</h2>
            <p>Everything we do is guided by our mission to deliver world-class healthcare management.</p>
          </div>

          <div className="why-container">
            <div className="why-card">
              <div className="why-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To deliver safe, reliable, and affordable healthcare services to every patient, everywhere.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🌐</div>
              <h3>Our Vision</h3>
              <p>To become the leading digital healthcare management platform improving patient care globally.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🏥</div>
              <h3>Our Services</h3>
              <p>24/7 emergency care, online appointments, qualified doctors, and digital patient records.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🤝</div>
              <h3>Our Commitment</h3>
              <p>Putting patients first with technology that makes healthcare management effortless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="container cta-content">
          <span>GET STARTED TODAY</span>
          <h2>Ready to Experience Better Healthcare?</h2>
          <p>Join thousands of patients and doctors already using CareInFlow.co</p>
          <Link to="/appointment" className="cta-button">Book an Appointment</Link>
        </div>
      </section>

    </main>
  );
};

export default About;
