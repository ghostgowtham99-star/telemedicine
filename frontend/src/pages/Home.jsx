import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Calendar, 
  FileText, 
  Building2, 
  Pill, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Users, 
  Heart, 
  Activity, 
  Search,
  Sparkles
} from 'lucide-react';
import heroImg from '../assets/hero_illustration.jpg';
import { fetchDoctors, fetchHospitals } from '../services/api';

export default function Home() {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [featuredHospitals, setFeaturedHospitals] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState('');

  useEffect(() => {
    fetchDoctors().then(docs => setFeaturedDoctors(docs.slice(0, 3)));
    fetchHospitals().then(hosps => setFeaturedHospitals(hosps.slice(0, 2)));
  }, []);

  const features = [
    {
      icon: <Video size={28} color="var(--teal-600)" />,
      title: 'Online Doctor Consultation',
      desc: 'Patients can consult doctors through secure video calls using their mobile phones or computers. Discuss symptoms, receive medical guidance, and get professional care safely.',
      link: '/doctors',
      actionText: 'Start Consultation'
    },
    {
      icon: <Calendar size={28} color="var(--teal-600)" />,
      title: 'Easy Appointment Booking',
      desc: 'Browse available doctors by specialization, select convenient time slots, and manage reservations directly from your personal device without long waiting queues.',
      link: '/doctors',
      actionText: 'Book Appointment'
    },
    {
      icon: <FileText size={28} color="var(--teal-600)" />,
      title: 'Digital Medical Prescriptions',
      desc: 'Access verified medical prescriptions digitally immediately after consultations. Save, print, and track medicine dosages anytime securely.',
      link: '/prescriptions',
      actionText: 'View Prescriptions'
    },
    {
      icon: <Building2 size={28} color="var(--teal-600)" />,
      title: 'Hospital Availability Checker',
      desc: 'Check live hospital capacity, ICU bed vacancy, emergency room wait times, and specialist availability before planning in-person hospital visits.',
      link: '/hospitals',
      actionText: 'Check Hospitals'
    },
    {
      icon: <Pill size={28} color="var(--teal-600)" />,
      title: 'Online Medicine Ordering',
      desc: 'Order prescribed medicines with doorstep delivery. Direct integration with trusted pharmacies to fulfill medications effortlessly.',
      link: '/pharmacy',
      actionText: 'Order Medicines'
    }
  ];

  const steps = [
    { step: '01', title: 'Create an Account', desc: 'Sign up to create your personalized health profile securely.' },
    { step: '02', title: 'Find a Doctor', desc: 'Browse certified specialists by medical category and ratings.' },
    { step: '03', title: 'Book an Appointment', desc: 'Select a suitable date and preferred consultation time slot.' },
    { step: '04', title: 'Consult Online', desc: 'Connect with your doctor via high-definition encrypted video call.' },
    { step: '05', title: 'Get Your Prescription', desc: 'Receive instant digital prescription with complete dosage instructions.' },
    { step: '06', title: 'Order Medicines', desc: 'Order your prescribed medicines with convenient home delivery.' },
    { step: '07', title: 'Check Hospital Availability', desc: 'View participating hospital beds and wait times before emergency visits.' }
  ];

  const benefits = [
    {
      title: 'Convenience',
      desc: 'Access healthcare services right from the comfort of your home without traveling.'
    },
    {
      title: 'Time-saving',
      desc: 'Eliminate travel hassles and reduce hours spent in crowded hospital waiting rooms.'
    },
    {
      title: 'Easy Mobile Access',
      desc: 'Book appointments, consult doctors, and track medicines on phone or computer.'
    },
    {
      title: 'Secure Digital Records',
      desc: 'Keep all consultations, clinical advice, and prescriptions organized in one portal.'
    },
    {
      title: 'Connected Healthcare',
      desc: 'Seamlessly link doctor appointments, hospital availability, and doorstep pharmacy.'
    },
    {
      title: 'Patient-Focused Experience',
      desc: 'Intuitive, compassionate interface crafted for patients of all age groups.'
    }
  ];

  return (
    <div>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section style={{ 
        background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%)',
        padding: '4.5rem 0 3.5rem',
        borderBottom: '1px solid var(--teal-100)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Headings & CTAs */}
            <div>
              <div className="section-badge" style={{ marginBottom: '1.25rem' }}>
                <Sparkles size={14} />
                <span>Healthcare Made Simple</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                fontWeight: 800,
                color: 'var(--gray-900)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}>
                Healthcare at Your <span style={{ 
                  color: 'var(--teal-600)',
                  position: 'relative'
                }}>Fingertips.</span>
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'var(--gray-600)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '560px'
              }}>
                Connect with doctors online, book appointments, receive digital prescriptions, check live hospital availability, and order medicines delivered to your door.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Link to="/doctors" className="btn btn-primary btn-lg">
                  <Video size={20} />
                  <span>Consult a Doctor</span>
                </Link>
                <Link to="/hospitals" className="btn btn-secondary btn-lg">
                  <Building2 size={20} />
                  <span>Check Hospitals</span>
                </Link>
                <Link to="/pharmacy" className="btn btn-secondary btn-lg">
                  <Pill size={20} />
                  <span>Order Medicines</span>
                </Link>
              </div>

              {/* Quick Trust Indicators */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--teal-100)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShieldCheck size={22} color="var(--teal-600)" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--gray-900)' }}>100% Secure</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Encrypted consultations</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Users size={22} color="var(--teal-600)" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--gray-900)' }}>Verified Doctors</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Certified specialists</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Clock size={22} color="var(--teal-600)" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--gray-900)' }}>Instant Access</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>No waiting rooms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-teal)',
                border: '4px solid var(--white)'
              }}>
                <img 
                  src={heroImg} 
                  alt="Telemedicine Consultation Platform" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Live Status Card */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'var(--white)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--teal-100)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                maxWidth: '260px'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--teal-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--teal-700)'
                }}>
                  <Heart size={22} fill="var(--teal-600)" color="var(--teal-600)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-900)' }}>
                    Immediate Care
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                    Doctors available right now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          METRICS & IMPACT BAR
          ============================================ */}
      <section style={{ background: 'var(--teal-700)', color: 'var(--white)', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>50,000+</div>
              <div style={{ color: 'var(--teal-100)', fontSize: '0.9rem' }}>Patients Supported</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>500+</div>
              <div style={{ color: 'var(--teal-100)', fontSize: '0.9rem' }}>Board Certified Doctors</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>98.9%</div>
              <div style={{ color: 'var(--teal-100)', fontSize: '0.9rem' }}>Positive Feedback</div>
            </div>
            <div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>24/7</div>
              <div style={{ color: 'var(--teal-100)', fontSize: '0.9rem' }}>Hospital Bed Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          KEY FEATURES SECTION
          ============================================ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Key Features</span>
            <h2 className="section-title">Everything You Need for Modern Healthcare</h2>
            <p className="section-subtitle">
              Our comprehensive ecosystem brings every pillar of patient care together in one friendly digital interface.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                  {item.desc}
                </p>
                <Link
                  to={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--teal-700)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}
                >
                  <span>{item.actionText}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED DOCTORS PREVIEW
          ============================================ */}
      <section className="section section-alt">
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span className="section-badge">Expert Care</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Consult Top Medical Specialists</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>
                Connect with highly qualified doctors across cardiology, pediatrics, general medicine, and dermatology.
              </p>
            </div>
            <Link to="/doctors" className="btn btn-primary">
              <span>View All Doctors</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {featuredDoctors.map((doc) => (
              <div key={doc.id} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-lg)',
                      objectFit: 'cover',
                      border: '2px solid var(--teal-200)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.2rem' }}>{doc.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--teal-700)', fontWeight: 600, marginBottom: '0.35rem' }}>
                      {doc.category}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                      <Star size={15} fill="#f59e0b" color="#f59e0b" />
                      <strong style={{ color: 'var(--gray-800)' }}>{doc.rating}</strong>
                      <span style={{ color: 'var(--gray-500)' }}>({doc.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: 'var(--teal-50)', 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem',
                  color: 'var(--teal-900)'
                }}>
                  <div style={{ marginBottom: '0.25rem' }}><strong>Hospital:</strong> {doc.hospital}</div>
                  <div><strong>Experience:</strong> {doc.experience}</div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--gray-100)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'block' }}>Consultation Fee</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--gray-900)' }}>${doc.fee}</strong>
                  </div>
                  <Link to={`/book/${doc.id}`} className="btn btn-primary btn-sm">
                    Book Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS (7 STEPS)
          ============================================ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title">How It Works in 7 Easy Steps</h2>
            <p className="section-subtitle">
              From signing up to getting your prescription filled and checking hospital beds, healthcare has never been more straightforward.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {steps.map((st, i) => (
              <div 
                key={i} 
                className="card"
                style={{
                  padding: '1.75rem',
                  position: 'relative',
                  borderLeft: '4px solid var(--teal-600)'
                }}
              >
                <div style={{
                  fontSize: '1.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--teal-600)',
                  marginBottom: '0.5rem'
                }}>
                  {st.step}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--gray-900)' }}>
                  {st.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE OUR PLATFORM?
          ============================================ */}
      <section className="section section-alt">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-badge">Patient Benefits</span>
              <h2 className="section-title">Why Choose Our Platform?</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                We believe that getting medical help should be simple, safe, and stress-free for everyone. Our platform removes geographical boundaries and long hospital lines to deliver care when it matters most.
              </p>
              <div style={{
                background: 'var(--white)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--teal-200)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ color: 'var(--teal-800)', marginBottom: '0.5rem' }}>Our Vision</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                  We aim to build a connected healthcare ecosystem where patients can easily access medical consultations, prescriptions, hospital information, and medicines in one place.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem'
            }}>
              {benefits.map((b, idx) => (
                <div key={idx} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} color="var(--teal-600)" />
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-900)' }}>{b.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CALL TO ACTION (Section 8)
          ============================================ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--teal-700) 0%, var(--teal-900) 100%)',
        color: 'var(--white)',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem'
          }}>
            Your Health Matters. We’re Here to Help.
          </span>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            color: 'var(--white)'
          }}>
            Take Control of Your Healthcare Today
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--teal-100)',
            lineHeight: 1.7,
            marginBottom: '2.5rem'
          }}>
            Find the care you need, whenever and wherever you need it. Connect with licensed medical experts, get prescriptions, and keep track of hospital availability.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/doctors" className="btn btn-secondary btn-lg" style={{ color: 'var(--teal-800)', background: 'var(--white)' }}>
              <Video size={20} />
              <span>Book Online Consultation</span>
            </Link>
            <Link to="/pharmacy" className="btn btn-outline-white btn-lg">
              <Pill size={20} />
              <span>Order Medicines</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
