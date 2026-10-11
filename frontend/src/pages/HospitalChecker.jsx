import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Activity, 
  Bed, 
  Clock, 
  Phone, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { fetchHospitals } from '../services/api';

export default function HospitalChecker() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchHospitals({ search: searchTerm }).then((data) => {
      setHospitals(data);
      setLoading(false);
    });
  }, [searchTerm]);

  const getStatusBadge = (status) => {
    if (status.includes('Immediate') || status.includes('Normal')) {
      return (
        <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
          <CheckCircle2 size={13} />
          {status}
        </span>
      );
    }
    return (
      <span className="badge badge-amber" style={{ fontSize: '0.8rem' }}>
        <AlertTriangle size={13} />
        {status}
      </span>
    );
  };

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">Live Network Checker</span>
          <h1 className="section-title">Hospital Availability Checker</h1>
          <p className="section-subtitle">
            Check participating hospital ICU beds, emergency wait times, and specialty wards in real-time before planning an in-person visit.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          background: 'var(--white)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--gray-200)',
          marginBottom: '2.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={20} color="var(--gray-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by hospital name, city district, or specialty (e.g. Cardiology, Trauma)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>
            Showing <strong>{hospitals.length}</strong> hospitals
          </div>
        </div>

        {/* Emergency Call-out Notice */}
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#9f1239'
        }}>
          <ShieldAlert size={28} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
            <strong>Emergency Assistance Notice:</strong> For critical life-threatening conditions (e.g. severe chest pain, major trauma, acute stroke symptoms), immediately call <strong>911</strong> or dispatch emergency services.
          </div>
        </div>

        {/* Hospital Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Fetching real-time hospital occupancy...</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', background: 'white', borderRadius: 'var(--radius-xl)' }}>
            <p>No hospitals found matching your criteria.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}>
            {hospitals.map((hosp) => (
              <div key={hosp.id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                {/* Hospital Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>
                      {hosp.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gray-500)', fontSize: '0.85rem' }}>
                      <MapPin size={15} color="var(--teal-600)" />
                      <span>{hosp.city} ({hosp.distance} away)</span>
                    </div>
                  </div>
                  {getStatusBadge(hosp.emergencyStatus)}
                </div>

                {/* Key Metrics: ICU Beds & Emergency Wait Time */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem',
                  background: 'var(--teal-50)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal-800)' }}>
                      {hosp.icuBedsAvailable}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', fontWeight: 600 }}>ICU Beds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal-800)' }}>
                      {hosp.generalBedsAvailable}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', fontWeight: 600 }}>General Beds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b45309' }}>
                      {hosp.waitTimeEmergency}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', fontWeight: 600 }}>ER Wait Time</div>
                  </div>
                </div>

                {/* Specialties */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                    Key Medical Specialties:
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {hosp.specialties.map((s, idx) => (
                      <span key={idx} className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                    Facilities:
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {hosp.facilities.map((f, idx) => (
                      <span key={idx} style={{
                        background: 'var(--gray-100)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        color: 'var(--gray-700)'
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--gray-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gray-700)', fontSize: '0.85rem' }}>
                    <Phone size={15} color="var(--teal-600)" />
                    <span style={{ fontWeight: 600 }}>{hosp.contactNumber}</span>
                  </div>

                  <a
                    href={`tel:${hosp.contactNumber.replace(/[^0-9]/g, '')}`}
                    className="btn btn-secondary btn-sm"
                  >
                    Direct Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
