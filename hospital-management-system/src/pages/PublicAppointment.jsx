import React, { useState } from 'react';

const PublicAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.doctor && formData.date && formData.time) {
      setStatusMessage('Appointment booked successfully! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', doctor: '', date: '', time: '', reason: '' });
      setTimeout(() => setStatusMessage(''), 4000);
    } else {
      setStatusMessage('Please fill all required fields.');
    }
  };

  return (
    <main className="page" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 20px', background: '#f4f8fb' }}>
      <style>{`
        .appointment-card {
            width: 100%;
            max-width: 700px;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
        }
        .appointment-card h1 {
            text-align: center;
            color: #087f8c;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 7px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 15px;
            outline: none;
            box-sizing: border-box;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: #087f8c;
        }
        .form-group textarea {
            resize: vertical;
        }
        .book-btn {
            width: 100%;
            padding: 14px;
            background: #087f8c;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 17px;
            font-weight: bold;
            cursor: pointer;
        }
        .book-btn:hover {
            background: #066b76;
        }
        #message {
            margin-top: 20px;
            padding: 14px;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
        }
        @media (max-width: 700px) {
            .appointment-card {
                padding: 25px;
            }
        }
      `}</style>
      <div className="appointment-card">
        <h1>Book an Appointment</h1>
        <p className="subtitle">Schedule an appointment with our experienced doctors.</p>

        <form id="appointmentForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Patient Name *</label>
            <input
              type="text"
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address (optional)"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor">Select Doctor / Department *</label>
            <select
              id="doctor"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              required
            >
              <option value="">-- Choose Doctor --</option>
              <option value="Dr. Ahmed Khan (Cardiology)">Dr. Ahmed Khan (Cardiology)</option>
              <option value="Dr. Sara Ali (Neurology)">Dr. Sara Ali (Neurology)</option>
              <option value="Dr. Usman Tariq (Dentist)">Dr. Usman Tariq (Dentist)</option>
              <option value="Dr. Fatima Noor (Pediatrics)">Dr. Fatima Noor (Pediatrics)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Appointment Date *</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Appointment Time *</label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <textarea
              id="reason"
              rows="3"
              placeholder="Briefly describe your symptoms or reason for visit"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="book-btn">Confirm Appointment</button>
        </form>

        {statusMessage && (
          <div id="message" style={{ background: statusMessage.includes('successfully') ? '#d4edda' : '#f8d7da', color: statusMessage.includes('successfully') ? '#155724' : '#721c24' }}>
            {statusMessage}
          </div>
        )}
      </div>
    </main>
  );
};

export default PublicAppointment;
