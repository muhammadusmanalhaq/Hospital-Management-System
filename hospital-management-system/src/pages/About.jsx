import React from 'react';

const About = () => {
  return (
    <main>
      <div className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
        <h2 style={{ color: '#007A5E', marginBottom: '20px' }}>About Our Hospital</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Welcome to CareInFlow (Hospital Management System). Our mission is to provide
          high-quality healthcare services with modern technology and experienced
          medical staff.
        </p>

        <h3 style={{ color: '#333', marginBottom: '15px' }}>Our Mission</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
          To deliver safe, reliable, and affordable healthcare services to every patient.
        </p>

        <h3 style={{ color: '#333', marginBottom: '15px' }}>Our Vision</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
          To become one of the leading digital healthcare management systems by
          improving patient care and hospital efficiency.
        </p>

        <h3 style={{ color: '#333', marginBottom: '15px' }}>Services</h3>
        <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>24/7 Emergency Service</li>
          <li>Online Appointment Booking</li>
          <li>Qualified Doctors</li>
          <li>Digital Patient Records</li>
          <li>Laboratory Services</li>
        </ul>
      </div>
    </main>
  );
};

export default About;
