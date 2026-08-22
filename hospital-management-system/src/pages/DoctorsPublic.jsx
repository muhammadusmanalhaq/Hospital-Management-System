import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Ahmed Khan',
    speciality: 'Cardiologist',
    rating: '4.9',
    qualifications: 'MBBS, FCPS',
    experience: '10+ Years Experience',
    department: 'Cardiology Department',
    img: '/images/doctor-male.jpg'
  },
  {
    id: 2,
    name: 'Dr. Sara Ali',
    speciality: 'Neurologist',
    rating: '4.8',
    qualifications: 'MBBS, FCPS',
    experience: '8+ Years Experience',
    department: 'Neurology Department',
    img: '/images/doctor-female.jpg'
  },
  {
    id: 3,
    name: 'Dr. Usman Tariq',
    speciality: 'Dentist',
    rating: '4.9',
    qualifications: 'BDS, FCPS',
    experience: '7+ Years Experience',
    department: 'Dental Department',
    img: '/images/doctor-male.jpg'
  },
  {
    id: 4,
    name: 'Dr. Fatima Noor',
    speciality: 'Pediatrician',
    rating: '4.9',
    qualifications: 'MBBS, FCPS',
    experience: '9+ Years Experience',
    department: 'Pediatrics Department',
    img: '/images/doctor-female.jpg'
  }
];

const DoctorsPublic = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorsData.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <style>{`
        .doctors-page-header {
          background: linear-gradient(135deg, #087f8c, #05636d);
          color: white;
          padding: 80px 20px;
          text-align: center;
        }
        .doctors-page-header h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 15px;
          color: white;
        }
        .doctors-page-header p {
          font-size: 18px;
          opacity: 0.9;
          margin: 0;
          color: white;
        }
        .doctors-search-wrap {
          max-width: 550px;
          margin: 0 auto 50px;
        }
        .doctors-search-wrap input {
          width: 100%;
          padding: 14px 20px;
          border: 1.5px solid #d9e2ec;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          transition: border 0.2s;
          box-sizing: border-box;
        }
        .doctors-search-wrap input:focus {
          border-color: #087f8c;
        }
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        @media (max-width: 1050px) {
          .doctors-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .doctors-grid { grid-template-columns: 1fr; }
          .doctors-page-header h1 { font-size: 34px; }
        }
        .doctor-card-pro {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 35px rgba(16,42,67,0.10);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e6edf3;
        }
        .doctor-card-pro:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 45px rgba(16,42,67,0.14);
        }
        .doctor-card-pro img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
        .doctor-card-body {
          padding: 22px;
        }
        .doctor-card-name {
          font-size: 17px;
          font-weight: 700;
          color: #102a43;
          margin: 0 0 6px;
        }
        .doctor-card-speciality {
          display: inline-block;
          background: #e9f8fa;
          color: #087f8c;
          font-size: 13px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 14px;
        }
        .doctor-card-rating {
          color: #f59e0b;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .doctor-card-rating span {
          color: #829ab1;
          font-size: 13px;
          margin-left: 4px;
        }
        .doctor-card-info {
          font-size: 13px;
          color: #52606d;
          margin: 5px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .doctor-card-btn {
          display: block;
          width: 100%;
          margin-top: 18px;
          padding: 11px;
          background: #087f8c;
          color: white;
          border: none;
          border-radius: 9px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
          box-sizing: border-box;
        }
        .doctor-card-btn:hover {
          background: #05636d;
          color: white;
        }
        .doctors-empty {
          text-align: center;
          color: #829ab1;
          padding: 60px 20px;
          grid-column: 1 / -1;
        }
      `}</style>

      {/* PAGE HEADER */}
      <section className="doctors-page-header">
        <div className="container">
          <h1>Our Expert Doctors</h1>
          <p>Meet our qualified and experienced medical professionals</p>
        </div>
      </section>

      {/* DOCTORS SECTION */}
      <section style={{ padding: '80px 0', background: '#f7fafc' }}>
        <div className="container">
          <div className="doctors-search-wrap">
            <input
              type="text"
              placeholder="🔍 Search doctor or speciality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card-pro">
                <img src={doctor.img} alt={doctor.name} />
                <div className="doctor-card-body">
                  <h4 className="doctor-card-name">{doctor.name}</h4>
                  <div className="doctor-card-speciality">{doctor.speciality}</div>
                  <div className="doctor-card-rating">
                    ★★★★★<span>{doctor.rating}</span>
                  </div>
                  <div className="doctor-card-info">🎓 {doctor.qualifications}</div>
                  <div className="doctor-card-info">🕒 {doctor.experience}</div>
                  <div className="doctor-card-info">🏥 {doctor.department}</div>
                  <Link to="/appointment" className="doctor-card-btn">
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="doctors-empty">
                <p>No doctors found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-content">
          <span>NEED MEDICAL ASSISTANCE?</span>
          <h2>Book a Consultation Today</h2>
          <p>Our expert doctors are ready to help you. Schedule your appointment in minutes.</p>
          <Link to="/appointment" className="cta-button">Book an Appointment</Link>
        </div>
      </section>
    </main>
  );
};

export default DoctorsPublic;
