import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Printer, 
  Download, 
  Pill, 
  Calendar, 
  User, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { fetchPrescriptions } from '../services/api';
import { useCart } from '../context/CartContext';

export default function Prescriptions() {
  const { rxId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderToast, setOrderToast] = useState(false);

  useEffect(() => {
    fetchPrescriptions().then((data) => {
      setPrescriptions(data);
      if (data.length > 0) {
        if (rxId) {
          const match = data.find(p => p.id === rxId);
          setSelectedRx(match || data[0]);
        } else {
          setSelectedRx(data[0]);
        }
      }
      setLoading(false);
    });
  }, [rxId]);

  const handleOrderAll = () => {
    if (!selectedRx) return;
    // Map prescribed medicines into cart items
    selectedRx.medicines.forEach((med, idx) => {
      addToCart({
        id: `rx-med-${idx}`,
        name: med.name,
        price: 9.50,
        brand: 'Prescription Pharma',
        category: 'Prescription Item',
        prescriptionRequired: true,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300'
      }, 1);
    });

    setOrderToast(true);
    setTimeout(() => {
      navigate('/pharmacy?cart=open');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
        <p>Loading digital prescriptions...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">Medical Records</span>
          <h1 className="section-title">Digital Medical Prescriptions</h1>
          <p className="section-subtitle">
            Instantly view, save, and order verified digital prescriptions issued by your consulting physician.
          </p>
        </div>

        {orderToast && (
          <div style={{
            background: 'var(--teal-600)',
            color: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease'
          }}>
            Prescribed medications added to your cart! Redirecting to doorstep checkout...
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Prescription List Sidebar */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--gray-100)' }}>
              Prescription History
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  onClick={() => setSelectedRx(rx)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    background: selectedRx?.id === rx.id ? 'var(--teal-50)' : 'var(--white)',
                    border: selectedRx?.id === rx.id ? '1.5px solid var(--teal-600)' : '1px solid var(--gray-200)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-700)' }}>{rx.id}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{rx.dateIssued}</span>
                  </div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--gray-900)' }}>{rx.doctorName}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '2px' }}>{rx.diagnosis}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Prescription Details Document */}
          {selectedRx ? (
            <div className="card" style={{ padding: '2.5rem', border: '1px solid var(--teal-200)', background: 'var(--white)' }}>
              {/* Prescription Header / Stamp */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '2px solid var(--teal-100)',
                paddingBottom: '1.5rem',
                marginBottom: '1.75rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div className="brand-icon-box" style={{ width: '32px', height: '32px' }}>
                      <FileText size={18} color="white" />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-800)' }}>
                      MediPulse Telehealth Rx
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                    Official Digital Telemedicine Document • License Verified
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handlePrint} className="btn btn-secondary btn-sm">
                    <Printer size={16} />
                    <span>Print / PDF</span>
                  </button>
                  <button onClick={handleOrderAll} className="btn btn-primary btn-sm">
                    <Pill size={16} />
                    <span>Order All Medicines</span>
                  </button>
                </div>
              </div>

              {/* Patient & Doctor Meta Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                background: 'var(--teal-50)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '2rem',
                fontSize: '0.9rem'
              }}>
                <div>
                  <div style={{ color: 'var(--teal-800)', fontWeight: 700, marginBottom: '0.25rem' }}>Doctor Details</div>
                  <div><strong>Name:</strong> {selectedRx.doctorName}</div>
                  <div><strong>Specialty:</strong> {selectedRx.doctorSpecialization}</div>
                  <div><strong>Date Issued:</strong> {selectedRx.dateIssued}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--teal-800)', fontWeight: 700, marginBottom: '0.25rem' }}>Patient Details</div>
                  <div><strong>Patient Name:</strong> {selectedRx.patientName}</div>
                  <div><strong>Prescription ID:</strong> {selectedRx.id}</div>
                  <div><strong>Format:</strong> Digital Tele-Consult</div>
                </div>
              </div>

              {/* Diagnosis */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Clinical Diagnosis
                </h4>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--teal-800)',
                  background: 'var(--white)',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--teal-200)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  {selectedRx.diagnosis}
                </div>
              </div>

              {/* Prescribed Medications Table */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--gray-500)', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Prescribed Medications ({selectedRx.medicines.length})
                </h4>

                <div style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead style={{ background: 'var(--gray-100)', color: 'var(--gray-700)' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1rem' }}>#</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Medicine & Strength</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Dosage & Frequency</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRx.medicines.map((med, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--teal-700)' }}>{index + 1}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{med.name}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--gray-700)' }}>{med.dosage}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--teal-800)', fontWeight: 600 }}>{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Physician Advice & Notes */}
              <div style={{
                background: '#fefce8',
                border: '1px solid #fef08a',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ color: '#854d0e', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Physician's Instructions & Lifestyle Advice:
                </h4>
                <p style={{ color: '#713f12', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {selectedRx.notes}
                </p>
              </div>

              {/* Digital Signature & Order Action Banner */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1.5rem',
                borderTop: '1.5px dashed var(--gray-200)',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--teal-700)', fontSize: '0.85rem' }}>
                  <ShieldCheck size={18} />
                  <span>Digitally authenticated by {selectedRx.doctorName} via MediPulse Health Engine</span>
                </div>

                <button onClick={handleOrderAll} className="btn btn-primary">
                  <Pill size={18} />
                  <span>Order Prescribed Medicines</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <p>No prescription selected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
