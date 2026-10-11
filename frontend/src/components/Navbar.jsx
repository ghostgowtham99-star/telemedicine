import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HeartPulse, 
  UserRound, 
  Calendar, 
  Building2, 
  Pill, 
  FileText, 
  ShoppingCart, 
  Video, 
  Menu, 
  X, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Find Doctors', path: '/doctors' },
    { label: 'Hospitals', path: '/hospitals' },
    { label: 'Pharmacy', path: '/pharmacy' },
    { label: 'Prescriptions', path: '/prescriptions' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <div className="brand-icon-box">
            <HeartPulse size={22} strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ color: 'var(--teal-800)', fontWeight: 800 }}>Medi</span>
            <span style={{ color: 'var(--teal-500)', fontWeight: 700 }}>Pulse</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Cart Icon */}
          <Link
            to="/pharmacy?cart=open"
            className="btn btn-secondary btn-sm"
            style={{ position: 'relative', padding: '0.45rem 0.9rem' }}
            title="Cart"
          >
            <ShoppingCart size={18} />
            {totalCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--teal-600)',
                  color: 'white',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalCount}
              </span>
            )}
          </Link>

          {/* Quick Consultation CTA */}
          <Link to="/doctors" className="btn btn-primary btn-sm">
            <Video size={16} />
            <span>Consult Doctor</span>
          </Link>

          {/* User Profile / Auth */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link to="/dashboard" title="Patient Profile">
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--teal-200)',
                  }}
                />
              </Link>
              <button
                onClick={logout}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.45rem' }}
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-secondary btn-sm">
              <UserRound size={16} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--gray-700)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--white)',
            borderBottom: '1px solid var(--gray-200)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontWeight: 600,
                color: location.pathname === link.path ? 'var(--teal-600)' : 'var(--gray-700)',
                padding: '0.5rem 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
