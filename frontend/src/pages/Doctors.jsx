import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Clock, 
  Calendar, 
  Video, 
  MapPin, 
  Award, 
  CheckCircle,
  Filter,
  ShieldCheck
} from 'lucide-react';
import { fetchDoctors } from '../services/api';

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'All';

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'General Physician',
    'Cardiology',
    'Pediatrics',
    'Dermatology',
    'Neurology',
    'Psychiatry'
  ];

  useEffect(() => {
    setLoading(true);
    fetchDoctors({ category: selectedCategory === 'All' ? '' : selectedCategory, search: searchTerm })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      });
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat });
    }
  };

  return (
    <div style={{ padding: '3.5rem 0', background: 'var(--gray-50)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">Verified Specialists</span>
          <h1 className="section-title">Find & Consult Top Doctors</h1>
          <p className="section-subtitle">
            Connect with board-certified physicians from leading hospitals. Book a convenient time slot or start an instant tele-consultation.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          background: 'var(--white)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--gray-200)',
          marginBottom: '2.5rem'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            marginBottom: '1.25rem'
          }}>
            <Search size={20} color="var(--gray-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by doctor name, medical condition, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>

          {/* Category Filter Chips */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-500)', marginRight: '0.5rem' }}>
              Specialization:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'var(--transition)',
                  background: selectedCategory === cat ? 'var(--teal-600)' : 'var(--white)',
                  color: selectedCategory === cat ? 'var(--white)' : 'var(--gray-700)',
                  border: selectedCategory === cat ? '1px solid var(--teal-600)' : '1px solid var(--gray-200)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Results Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--teal-700)' }}>
            <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Loading medical specialists...</p>
          </div>
        ) : doctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            background: 'var(--white)',
            padding: '4rem 2rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--gray-200)'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-600)', marginBottom: '1rem' }}>
              No doctors found matching "{searchTerm}" in category "{selectedCategory}".
            </p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem'
          }}>
            {doctors.map((doc) => (
              <div 
                key={doc.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '1.75rem',
                  border: '1px solid var(--teal-100)'
                }}
              >
                {/* Doctor Header */}
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: 'var(--radius-lg)',
                        objectFit: 'cover',
                        border: '2px solid var(--teal-200)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      background: 'var(--teal-600)',
                      borderRadius: '50%',
                      padding: '3px',
                      color: 'white',
                      display: 'flex'
                    }}>
                      <ShieldCheck size={14} />
                    </div>
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {doc.name}
                    </h3>
                    <div style={{ color: 'var(--teal-700)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem' }}>
                      {doc.specialization}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                      <Star size={15} fill="#f59e0b" color="#f59e0b" />
                      <strong>{doc.rating}</strong>
                      <span style={{ color: 'var(--gray-500)' }}>({doc.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Info Pills */}
                <div style={{
                  background: 'var(--teal-50)',
                  padding: '0.9rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-700)' }}>
                    <Award size={15} color="var(--teal-600)" />
                    <span><strong>Experience:</strong> {doc.experience}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-700)' }}>
                    <MapPin size={15} color="var(--teal-600)" />
                    <span><strong>Hospital:</strong> {doc.hospital}</span>
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                    Next Available Slots:
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {doc.timeSlots.slice(0, 3).map((slot, i) => (
                      <span key={i} className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
                        <Clock size={12} />
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Fee & Action Buttons */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--gray-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'block' }}>Video Consult</span>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--gray-900)' }}>${doc.fee}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/consult/${doc.id}`} className="btn btn-secondary btn-sm" title="Instant Consultation Room">
                      <Video size={16} />
                      <span>Consult</span>
                    </Link>
                    <Link to={`/book/${doc.id}`} className="btn btn-primary btn-sm">
                      <Calendar size={16} />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
