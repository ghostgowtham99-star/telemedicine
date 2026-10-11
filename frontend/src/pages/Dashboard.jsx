import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Video, 
  FileText, 
  Pill, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Package, 
  Activity,
  Heart,
  Droplet,
  Phone,
  Mail
} from 'lucide-react';
import { fetchAppointments, fetchPrescriptions, fetchOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAppointments(), fetchPrescriptions(), fetchOrders()]).then(
      ([apts, rxs, ords]) => {
        setAppointments(apts);
        setPrescriptions(rxs);
        setOrders(ords);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '85vh' }}>
      <div className="container">
        {/* Patient Profile Card */}
        <div className="card" style={{
          padding: '2rem',
          marginBottom: '2.5rem',
          background: 'linear-gradient(135deg, var(--teal-800) 0%, var(--teal-900) 100%)',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name || 'Patient'}
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--teal-300)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                  {user?.name || 'John Doe'}
                </h1>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  Verified Patient
                </span>
              </div>
              <p style={{ color: 'var(--teal-200)', fontSize: '0.9rem' }}>
                Health ID: PID-98420 • {user?.email || 'john@example.com'}
              </p>
            </div>
          </div>

          {/* Quick Health Stats */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--teal-200)' }}>Blood Group</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{user?.bloodGroup || 'O+'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--teal-200)' }}>Upcoming Calls</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {appointments.filter(a => a.status === 'Upcoming').length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--teal-200)' }}>Prescriptions</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{prescriptions.length}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
          {/* Left Column: Appointments & Video Calls */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>My Appointments</h2>
              <Link to="/doctors" className="btn btn-secondary btn-sm">
                + Book New
              </Link>
            </div>

            {loading ? (
              <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No appointments scheduled yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {appointments.map((apt) => (
                  <div key={apt.id} className="card" style={{ padding: '1.5rem', border: '1px solid var(--teal-100)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <img
                          src={apt.doctorAvatar}
                          alt={apt.doctorName}
                          style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                        />
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{apt.doctorName}</h3>
                          <div style={{ fontSize: '0.825rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                            {apt.doctorSpecialization}
                          </div>
                        </div>
                      </div>

                      <span className={`badge ${apt.status === 'Upcoming' ? 'badge-green' : 'badge-teal'}`}>
                        {apt.status}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '1.5rem',
                      background: 'var(--gray-50)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1rem',
                      fontSize: '0.85rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gray-700)' }}>
                        <Calendar size={15} color="var(--teal-600)" />
                        <span>{apt.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gray-700)' }}>
                        <Clock size={15} color="var(--teal-600)" />
                        <span>{apt.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gray-700)' }}>
                        <Video size={15} color="var(--teal-600)" />
                        <span>{apt.consultationType}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                        Reason: {apt.reason}
                      </span>

                      {apt.status === 'Upcoming' ? (
                        <Link to={`/consult/${apt.doctorId}`} className="btn btn-primary btn-sm">
                          <Video size={15} />
                          <span>Join Video Call</span>
                        </Link>
                      ) : (
                        <Link to={`/prescriptions/${apt.prescriptionId}`} className="btn btn-secondary btn-sm">
                          <FileText size={15} />
                          <span>View Prescription</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prescriptions Shortcut */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Recent Digital Prescriptions</h2>
              <Link to="/prescriptions" style={{ fontSize: '0.9rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                View All
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {prescriptions.map((rx) => (
                <div key={rx.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--teal-700)', fontWeight: 700 }}>{rx.id} • {rx.dateIssued}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0' }}>{rx.diagnosis}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Issued by {rx.doctorName}</span>
                  </div>

                  <Link to={`/prescriptions/${rx.id}`} className="btn btn-secondary btn-sm">
                    <FileText size={15} />
                    <span>Open Rx</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Medicine Orders & Quick Actions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Medicine Deliveries</h2>
              <Link to="/pharmacy" className="btn btn-secondary btn-sm">
                + Order More
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {orders.map((ord) => (
                <div key={ord.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ord.id}</span>
                    <span className="badge badge-green">{ord.status}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>
                    Ordered on {ord.date} • Est: {ord.estimatedDelivery}
                  </div>

                  <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--gray-700)', marginBottom: '4px' }}>Items ({ord.items.length}):</div>
                    {ord.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-600)', fontSize: '0.8rem' }}>
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontWeight: 700 }}>
                    <span>Total Paid:</span>
                    <span style={{ color: 'var(--teal-800)' }}>${ord.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Card */}
            <div className="card" style={{ padding: '1.5rem', background: 'var(--teal-50)', border: '1px solid var(--teal-200)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--teal-900)', marginBottom: '1rem' }}>
                Healthcare Shortlinks
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <Link to="/hospitals" className="btn btn-secondary" style={{ background: 'white', justifyContent: 'flex-start' }}>
                  <Activity size={16} />
                  <span>Hospital Availability Checker</span>
                </Link>
                <Link to="/doctors" className="btn btn-secondary" style={{ background: 'white', justifyContent: 'flex-start' }}>
                  <Video size={16} />
                  <span>Start New Tele-Consultation</span>
                </Link>
                <Link to="/pharmacy" className="btn btn-secondary" style={{ background: 'white', justifyContent: 'flex-start' }}>
                  <Pill size={16} />
                  <span>Doorstep Pharmacy Catalog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
