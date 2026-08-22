import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setStatusMessage('Message Sent Successfully! We will contact you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatusMessage(''), 4000);
    } else {
      setStatusMessage('Please fill all fields.');
    }
  };

  return (
    <main>
      <style>{`
        .contact-hero {
          background: linear-gradient(135deg, #087f8c, #05636d);
          color: white;
          padding: 80px 20px;
          text-align: center;
        }
        .contact-hero h1 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 15px;
          color: white;
        }
        .contact-hero p {
          font-size: 18px;
          opacity: 0.9;
          margin: 0;
          color: white;
        }
        .contact-section {
          padding: 90px 0;
          background: #f7fafc;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 35px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-hero h1 { font-size: 34px; }
        }
        .contact-info-card {
          background: white;
          border-radius: 18px;
          padding: 40px 35px;
          box-shadow: 0 10px 35px rgba(16,42,67,0.10);
          border: 1px solid #e6edf3;
        }
        .contact-info-card h2 {
          font-size: 24px;
          font-weight: 800;
          color: #102a43;
          margin: 0 0 30px;
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 20px 0;
          border-bottom: 1px solid #edf2f7;
        }
        .contact-info-item:last-child {
          border-bottom: none;
        }
        .contact-info-icon {
          width: 46px;
          height: 46px;
          background: #e9f8fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .contact-info-text h4 {
          font-size: 14px;
          font-weight: 700;
          color: #087f8c;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 0 0 4px;
        }
        .contact-info-text p {
          font-size: 15px;
          color: #52606d;
          margin: 0;
          line-height: 1.5;
        }
        .contact-form-card {
          background: white;
          border-radius: 18px;
          padding: 40px 35px;
          box-shadow: 0 10px 35px rgba(16,42,67,0.10);
          border: 1px solid #e6edf3;
        }
        .contact-form-card h2 {
          font-size: 24px;
          font-weight: 800;
          color: #102a43;
          margin: 0 0 30px;
        }
        .cf-group {
          margin-bottom: 22px;
        }
        .cf-group label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #486581;
          margin-bottom: 8px;
        }
        .cf-group input,
        .cf-group textarea {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #d9e2ec;
          border-radius: 10px;
          font-size: 15px;
          color: #102a43;
          outline: none;
          transition: border 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        .cf-group input:focus,
        .cf-group textarea:focus {
          border-color: #087f8c;
        }
        .cf-group textarea {
          resize: vertical;
          min-height: 130px;
        }
        .cf-submit {
          width: 100%;
          padding: 14px;
          background: #087f8c;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .cf-submit:hover {
          background: #05636d;
          transform: translateY(-2px);
        }
        .cf-status {
          text-align: center;
          margin-top: 16px;
          font-weight: 600;
          font-size: 15px;
        }
      `}</style>

      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact CareInFlow.co</h1>
          <p>Have a question? We'd love to hear from you. Send us a message and we'll respond shortly.</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* Info Card */}
            <div className="contact-info-card">
              <h2>Get In Touch</h2>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div className="contact-info-text">
                  <h4>Address</h4>
                  <p>Karachi, Pakistan</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div className="contact-info-text">
                  <h4>Phone</h4>
                  <p>+92 300 1234567</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div className="contact-info-text">
                  <h4>Email</h4>
                  <p>info@careinflow.co</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">🕒</div>
                <div className="contact-info-text">
                  <h4>Opening Hours</h4>
                  <p>Open 24/7 — Always here for you</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="cf-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="cf-group">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="cf-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="cf-submit">Send Message</button>
                {statusMessage && (
                  <p className="cf-status" style={{ color: statusMessage.includes('Success') ? '#087f8c' : 'red' }}>
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
