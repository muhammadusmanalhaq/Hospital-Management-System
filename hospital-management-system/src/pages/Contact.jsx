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
        .contact-container {
            max-width: 1100px;
            margin: 50px auto;
            padding: 20px;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        .contact-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .contact-item {
            margin: 20px 0;
        }
        .contact-item h3 {
            margin-bottom: 5px;
        }
        .form-group {
            margin-bottom: 18px;
        }
        .form-group label {
            display: block;
            margin-bottom: 7px;
            font-weight: bold;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 7px;
            box-sizing: border-box;
        }
        .form-group textarea {
            resize: vertical;
        }
        .send-btn {
            width: 100%;
            padding: 13px;
            background: #0d6efd;
            color: white;
            border: none;
            border-radius: 7px;
            cursor: pointer;
            font-size: 16px;
        }
        .send-btn:hover {
            background: #0b5ed7;
        }
        #contactMessage {
            text-align: center;
            margin-top: 15px;
            font-weight: bold;
        }
        @media(max-width: 700px) {
            .contact-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
      <div className="contact-container">
        <h1>Contact CareInFlow.co</h1>
        <p>Have a question? Send us a message.</p>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-card">
            <h2>Get In Touch</h2>
            <div className="contact-item">
              <h3>📍 Address</h3>
              <p>Karachi, Pakistan</p>
            </div>
            <div className="contact-item">
              <h3>📞 Phone</h3>
              <p>+92 300 1234567</p>
            </div>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>info@careinflow.co</p>
            </div>
            <div className="contact-item">
              <h3>🕒 Opening Hours</h3>
              <p>Open 24/7</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card">
            <h2>Send Us a Message</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button type="submit" className="send-btn">
                Send Message
              </button>
            </form>
            {statusMessage && (
              <p id="contactMessage" style={{ color: statusMessage.includes('Success') ? 'green' : 'red' }}>
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
