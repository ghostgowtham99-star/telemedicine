import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import AppointmentBooking from './pages/AppointmentBooking';
import ConsultationRoom from './pages/ConsultationRoom';
import Prescriptions from './pages/Prescriptions';
import HospitalChecker from './pages/HospitalChecker';
import Pharmacy from './pages/Pharmacy';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/book/:doctorId" element={<AppointmentBooking />} />
                <Route path="/consult/:doctorId" element={<ConsultationRoom />} />
                <Route path="/prescriptions" element={<Prescriptions />} />
                <Route path="/prescriptions/:rxId" element={<Prescriptions />} />
                <Route path="/hospitals" element={<HospitalChecker />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
