import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HeartPulse, Mail, Lock, User, Phone, Droplet, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name || (email.split('@')[0].toUpperCase()),
      email,
      phone: phone || '+1 (555) 234-5678',
      bloodGroup
    });
    navigate('/dashboard');
  };

  return (
    <div style={{
      padding: '4rem 0',
      background: 'linear-gradient(180deg, var(--teal-50) 0%, #ffffff 100%)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--teal-100)' }}>
          {/* Logo & Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="brand-icon-box" style={{ margin: '0 auto 1rem' }}>
              <HeartPulse size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gray-900)' }}>
              {isSignUp ? 'Create Patient Account' : 'Welcome Back'}
            </h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '4px' }}>
              {isSignUp
                ? 'Sign up to consult doctors, manage prescriptions & hospitals'
                : 'Access your appointments, prescriptions and health records'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div className="form-control">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="var(--gray-400)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '0.75rem' }}>
                  <div className="form-control">
                    <label className="form-label">Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} color="var(--gray-400)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '2.4rem' }}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="form-label">Blood Group</label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="form-input"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="form-control">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--gray-400)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--gray-400)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <span>{isSignUp ? 'Create My Account' : 'Sign In to Portal'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Toggle Link */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  style={{ color: 'var(--teal-700)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  style={{ color: 'var(--teal-700)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Create Account
                </button>
              </span>
            )}
          </div>

          {/* HIPAA & Security Note */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--gray-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            color: 'var(--gray-500)',
            fontSize: '0.75rem'
          }}>
            <ShieldCheck size={16} color="var(--teal-600)" />
            <span>256-bit Encrypted Telehealth Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
