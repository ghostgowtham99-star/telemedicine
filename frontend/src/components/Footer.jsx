import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-icon-box">
                <HeartPulse size={22} color="white" />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--white)' }}>
                Medi<span style={{ color: 'var(--teal-400)' }}>Pulse</span>
              </span>
            </div>
            <p style={{ color: 'var(--teal-300)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.75rem' }}>
              “Healthcare at Your Fingertips.”
            </p>
            <p className="footer-brand-p">
              Making healthcare convenient, affordable, and accessible by connecting patients, doctors, hospitals, and pharmacies through a single digital platform.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', color: 'var(--gray-400)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="var(--teal-400)" />
                <span>HIPAA Compliant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                <Award size={16} color="var(--teal-400)" />
                <span>Certified Doctors</span>
              </div>
            </div>
          </div>

          {/* Quick Services */}
          <div className="footer-col">
            <h4>Healthcare Services</h4>
            <ul>
              <li><Link to="/doctors">Online Doctor Consultation</Link></li>
              <li><Link to="/doctors">Book Appointments</Link></li>
              <li><Link to="/prescriptions">Digital Prescriptions</Link></li>
              <li><Link to="/hospitals">Hospital Availability Checker</Link></li>
              <li><Link to="/pharmacy">Online Medicine Ordering</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="footer-col">
            <h4>Specializations</h4>
            <ul>
              <li><Link to="/doctors?cat=General+Physician">General Physician</Link></li>
              <li><Link to="/doctors?cat=Cardiology">Cardiology</Link></li>
              <li><Link to="/doctors?cat=Pediatrics">Pediatrics</Link></li>
              <li><Link to="/doctors?cat=Dermatology">Dermatology</Link></li>
              <li><Link to="/doctors?cat=Neurology">Neurology</Link></li>
              <li><Link to="/doctors?cat=Psychiatry">Psychiatry & Wellness</Link></li>
            </ul>
          </div>

          {/* Contact & Emergency Notice */}
          <div className="footer-col">
            <h4>Emergency & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--gray-300)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--teal-400)" />
                <span>Tele-Care Hotline: +1 (800) 432-5880</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="var(--teal-400)" />
                <span>care@medipulse.org</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={16} color="var(--teal-400)" />
                <span>24/7 Digital Support Available</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: '#fca5a5',
              }}
            >
              <strong>Medical Emergency:</strong> If you are experiencing a life-threatening medical situation, immediately call <strong>911</strong> or visit your nearest hospital emergency ward.
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MediPulse Telemedicine Platform. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#telehealth-consent">Telehealth Consent</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
