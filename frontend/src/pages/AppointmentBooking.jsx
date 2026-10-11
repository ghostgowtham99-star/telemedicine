import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  ShieldCheck, 
  User, 
  Mail, 
  FileEdit, 
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { fetchDoctorById, createAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AppointmentBooking() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [patientName, setPatientName] = useState(user?.name || 'John Doe');
  const [patientEmail, setPatientEmail] = useState(user?.email || 'john@example.com');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctorById(doctorId).then((data) => {
      setDoctor(data);
      if (data && data.timeSlots?.length) {
        setSelectedTime(data.timeSlots[0]);
      }
      setLoading(false);
    });
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select a preferred time slot');
      return;
    }

    setSubmitting(true);
    const appointmentData = {
      doctorId: doctor.id,
      patientName,
      patientEmail,
      date: selectedDate,
      time: selectedTime,
      reason: reason || 'Routine tele-consultation'
    };

    const res = await createAppointment(appointmentData);
    setBookingSuccess(res);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
        <p>Loading doctor information...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Doctor Not Found</h2>
        <p style={{ margin: '1rem 0' }}>The requested physician could not be loaded.</p>
        <Link to="/doctors" className="btn btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div style={{ padding: '4rem 0', background: 'var(--teal-50)', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', border: '2px solid var(--teal-200)' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--teal-100)',
              color: 'var(--teal-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle size={36} color="var(--teal-600)" />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--gray-900)' }}>
              Appointment Confirmed!
            </h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
              Your tele-consultation with <strong>{doctor.name}</strong> has been successfully booked. You will receive an email confirmation with calendar sync instructions.
            </p>

            <div style={{
              background: 'var(--gray-50)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.9rem'
            }}>
              <div><strong>Appointment ID:</strong> {bookingSuccess.id}</div>
              <div><strong>Doctor:</strong> {doctor.name} ({doctor.specialization})</div>
              <div><strong>Scheduled Date:</strong> {bookingSuccess.date}</div>
              <div><strong>Scheduled Time:</strong> {bookingSuccess.time}</div>
              <div><strong>Consultation Format:</strong> Secure HD Video Call</div>
              <div><strong>Patient:</strong> {patientName} ({patientEmail})</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/consult/${doctor.id}`} className="btn btn-primary">
                <Video size={18} />
                <span>Join Video Room</span>
              </Link>
              <Link to="/dashboard" className="btn btn-secondary">
                <span>View in Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        <Link to="/doctors" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--teal-700)',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          <ArrowLeft size={16} />
          <span>Back to All Doctors</span>
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem'
        }}>
          {/* Booking Form */}
          <div className="card" style={{ padding: '2.25rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Book Your Consultation
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Fill in your preferred date and time for the video consultation.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Patient Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-control">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-control">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Consultation Date */}
              <div className="form-control">
                <label className="form-label">Consultation Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Consultation Time Slots */}
              <div className="form-control">
                <label className="form-label">Select Available Time Slot</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '0.25rem' }}>
                  {doctor.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedTime === slot ? '2px solid var(--teal-600)' : '1.5px solid var(--gray-200)',
                        background: selectedTime === slot ? 'var(--teal-50)' : 'var(--white)',
                        color: selectedTime === slot ? 'var(--teal-800)' : 'var(--gray-700)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'var(--transition)'
                      }}
                    >
                      <Clock size={16} color={selectedTime === slot ? 'var(--teal-600)' : 'var(--gray-400)'} />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reason for Visit */}
              <div className="form-control">
                <label className="form-label">Reason for Consultation (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Describe your symptoms or medical questions..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {submitting ? 'Confirming...' : `Confirm & Book Appointment ($${doctor.fee})`}
              </button>
            </form>
          </div>

          {/* Doctor Summary & Fee Details */}
          <div>
            <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid var(--teal-100)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Consultation Summary
              </h3>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-lg)',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{doctor.name}</h4>
                  <div style={{ fontSize: '0.825rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                    {doctor.specialization}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    {doctor.hospital}
                  </div>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--gray-100)',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Consultation Type</span>
                  <span style={{ fontWeight: 600 }}>Video Call (HD)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Platform Fee</span>
                  <span style={{ color: 'var(--teal-600)', fontWeight: 600 }}>FREE ($0)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray-500)' }}>Doctor Fee</span>
                  <span style={{ fontWeight: 600 }}>${doctor.fee}.00</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  borderTop: '1.5px dashed var(--gray-200)', 
                  paddingTop: '0.75rem',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--gray-900)'
                }}>
                  <span>Total Payable</span>
                  <span style={{ color: 'var(--teal-700)' }}>${doctor.fee}.00</span>
                </div>
              </div>
            </div>

            {/* Telehealth Guarantee */}
            <div style={{
              background: 'var(--white)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--gray-200)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start'
            }}>
              <ShieldCheck size={24} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.825rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                <strong>Telehealth Guarantee:</strong> Encrypted, HIPAA-compliant session. If the doctor cannot attend, you receive a full refund or instant rescheduling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
