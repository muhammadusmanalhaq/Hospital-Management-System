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
    department: 'Cardiology Department'
  },
  {
    id: 2,
    name: 'Dr. Sara Ali',
    speciality: 'Neurologist',
    rating: '4.8',
    qualifications: 'MBBS, FCPS',
    experience: '8+ Years Experience',
    department: 'Neurology Department'
  },
  {
    id: 3,
    name: 'Dr. Usman Tariq',
    speciality: 'Dentist',
    rating: '4.9',
    qualifications: 'BDS, FCPS',
    experience: '7+ Years Experience',
    department: 'Dental Department'
  },
  {
    id: 4,
    name: 'Dr. Fatima Noor',
    speciality: 'Pediatrician',
    rating: '4.9',
    qualifications: 'MBBS, FCPS',
    experience: '9+ Years Experience',
    department: 'Pediatrics Department'
  }
];

const DoctorsPublic = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorsData.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ backgroundColor: '#f5f8fc', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* ================= PAGE HEADER ================= */}
      <section style={{ background: 'linear-gradient(135deg, #0d6efd, #084298)', color: 'white', padding: '70px 20px', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '45px', fontWeight: '700' }}>Our Expert Doctors</h1>
          <p style={{ fontSize: '18px', marginTop: '15px' }}>Meet our qualified and experienced medical professionals</p>
        </div>
      </section>

      {/* ================= DOCTORS SECTION ================= */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          {/* Search */}
          <div style={{ maxWidth: '600px', margin: '0 auto 50px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search doctor or speciality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ height: '50px', borderRadius: '10px', border: '1px solid #ddd', paddingLeft: '20px' }}
            />
          </div>

          <div className="row g-4">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="col-lg-3 col-md-6">
                <div style={{ background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', transition: '0.3s ease', height: '100%' }}>
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#e2f0ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                    [Doctor Image]
                  </div>
                  <div style={{ padding: '25px' }}>
                    <h4 style={{ fontWeight: '700', color: '#212529', marginBottom: '8px' }}>{doctor.name}</h4>
                    <div style={{ color: '#0d6efd', fontWeight: '600', marginBottom: '15px' }}>{doctor.speciality}</div>
                    <div style={{ color: '#ffc107', marginBottom: '15px' }}>
                      ★★★★★ <span className="text-muted">{doctor.rating}</span>
                    </div>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>
                      <span style={{ color: '#0d6efd', marginRight: '7px' }}>🎓</span> {doctor.qualifications}
                    </p>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>
                      <span style={{ color: '#0d6efd', marginRight: '7px' }}>🕒</span> {doctor.experience}
                    </p>
                    <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '8px' }}>
                      <span style={{ color: '#0d6efd', marginRight: '7px' }}>🏥</span> {doctor.department}
                    </p>
                    <Link to="/appointment" className="btn btn-primary" style={{ width: '100%', borderRadius: '8px', padding: '10px', fontWeight: '600', marginTop: '15px' }}>
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="text-center w-100 mt-5">
                <p className="text-muted">No doctors found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Need Medical Consultation?</h2>
          <p className="mt-3">Book an appointment with one of our expert doctors today.</p>
          <Link to="/appointment" className="btn btn-light btn-lg mt-2">
            Book Appointment
          </Link>
        </div>
      </section>
    </main>
  );
};

export default DoctorsPublic;
