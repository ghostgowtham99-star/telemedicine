const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// MOCK DATA STORAGE
// ==========================================

const doctors = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    specialization: 'General Physician & Family Medicine',
    category: 'General Physician',
    experience: '12 years',
    rating: 4.9,
    reviewsCount: 320,
    fee: 45,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
    hospital: 'Metro Health Central Hospital',
    about: 'Dr. Sarah Jenkins is an experienced primary care physician dedicated to preventive healthcare and remote patient guidance.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance',
    specialization: 'Cardiologist & Heart Specialist',
    category: 'Cardiology',
    experience: '16 years',
    rating: 4.95,
    reviewsCount: 450,
    fee: 75,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    timeSlots: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM'],
    hospital: 'St. Jude Heart & Vascular Institute',
    about: 'Specialized in preventative cardiology, hypertension management, and non-invasive cardiovascular diagnostics.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrician & Child Health',
    category: 'Pediatrics',
    experience: '10 years',
    rating: 4.88,
    reviewsCount: 290,
    fee: 50,
    avatar: 'https://images.unsplash.com/photo-1594824813587-0b19685e135e?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['09:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    hospital: 'Sunrise Children’s Medical Center',
    about: 'Compassionate pediatric care focusing on infant nutrition, growth milestones, and pediatric viral infections.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Alexander Chen',
    specialization: 'Dermatologist & Skin Health',
    category: 'Dermatology',
    experience: '14 years',
    rating: 4.92,
    reviewsCount: 380,
    fee: 60,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    timeSlots: ['10:00 AM', '01:00 PM', '03:30 PM', '06:00 PM'],
    hospital: 'Aura Skin & Aesthetic Institute',
    about: 'Expertise in chronic acne, eczema, hair loss, and tele-dermatology digital screenings.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Elena Rostova',
    specialization: 'Neurologist & Sleep Specialist',
    category: 'Neurology',
    experience: '18 years',
    rating: 4.96,
    reviewsCount: 215,
    fee: 85,
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Wed', 'Thu', 'Fri'],
    timeSlots: ['11:00 AM', '02:30 PM', '05:00 PM'],
    hospital: 'Apex Neurological Care Center',
    about: 'Specializes in migraines, sleep apnea, nerve pain, and comprehensive cognitive assessments.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Kevin Miller',
    specialization: 'Psychiatrist & Mental Wellness',
    category: 'Psychiatry',
    experience: '11 years',
    rating: 4.9,
    reviewsCount: 340,
    fee: 70,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['09:00 AM', '12:00 PM', '03:00 PM', '05:30 PM'],
    hospital: 'MindWell Behavioral Health Center',
    about: 'Supportive mental health guidance covering anxiety, burnout, sleep disturbance, and cognitive wellness.'
  }
];

let appointments = [
  {
    id: 'apt-101',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'General Physician & Family Medicine',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    date: '2026-10-15',
    time: '10:30 AM',
    reason: 'Seasonal allergy follow-up and persistent cough',
    status: 'Upcoming',
    consultationType: 'Video Call',
    prescriptionId: 'rx-201'
  },
  {
    id: 'apt-102',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    doctorId: 'doc-4',
    doctorName: 'Dr. Alexander Chen',
    doctorSpecialization: 'Dermatologist & Skin Health',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    date: '2026-10-05',
    time: '03:30 PM',
    reason: 'Skin rash on forearm consultation',
    status: 'Completed',
    consultationType: 'Video Call',
    prescriptionId: 'rx-202'
  }
];

let prescriptions = [
  {
    id: 'rx-201',
    appointmentId: 'apt-101',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'General Physician',
    dateIssued: '2026-10-02',
    diagnosis: 'Acute Upper Respiratory Tract Irritation',
    notes: 'Stay hydrated, avoid cold beverages, and rest for 3 days. Follow up if fever exceeds 101°F.',
    medicines: [
      { name: 'Cetirizine Hydrochloride (10mg)', dosage: '1 tablet once daily before sleep', duration: '5 days' },
      { name: 'Paracetamol (500mg)', dosage: '1 tablet every 6-8 hrs as needed for fever/pain', duration: '3 days' },
      { name: 'Ambroxol Cough Syrup (100ml)', dosage: '10ml thrice daily after meals', duration: '5 days' }
    ]
  },
  {
    id: 'rx-202',
    appointmentId: 'apt-102',
    patientName: 'John Doe',
    doctorName: 'Dr. Alexander Chen',
    doctorSpecialization: 'Dermatologist',
    dateIssued: '2026-10-05',
    diagnosis: 'Contact Dermatitis / Mild Allergic Eczema',
    notes: 'Apply soothing cream twice daily. Avoid scented soaps and synthetic fabrics.',
    medicines: [
      { name: 'Hydrocortisone 1% Topical Cream (30g)', dosage: 'Apply thin layer twice daily', duration: '7 days' },
      { name: 'Loratadine (10mg)', dosage: '1 tablet in morning', duration: '10 days' }
    ]
  }
];

const hospitals = [
  {
    id: 'hosp-1',
    name: 'Metro Health Central Hospital',
    city: 'Downtown Medical District',
    distance: '3.2 km',
    emergencyStatus: 'Available (Normal wait)',
    icuBedsAvailable: 8,
    generalBedsAvailable: 34,
    waitTimeEmergency: '15 mins',
    contactNumber: '+1 (800) 555-0199',
    specialties: ['Emergency Trauma', 'Cardiology', 'Neurology', 'Orthopedics'],
    facilities: ['24/7 Pharmacy', 'CT / MRI Diagnostics', 'Ambulance On-Call', 'Pediatric ICU'],
    rating: 4.8
  },
  {
    id: 'hosp-2',
    name: 'St. Jude Heart & Vascular Institute',
    city: 'Northside Health Campus',
    distance: '6.8 km',
    emergencyStatus: 'High Volume (Slight delay)',
    icuBedsAvailable: 3,
    generalBedsAvailable: 12,
    waitTimeEmergency: '35 mins',
    contactNumber: '+1 (800) 555-0144',
    specialties: ['Cardiovascular Surgery', 'Cardiac Rehab', 'Vascular Care'],
    facilities: ['Hybrid Cath Labs', 'Helipad', 'Emergency Cardiac Unit'],
    rating: 4.9
  },
  {
    id: 'hosp-3',
    name: 'Sunrise Children’s Medical Center',
    city: 'West Valley Park',
    distance: '5.1 km',
    emergencyStatus: 'Available (Immediate)',
    icuBedsAvailable: 11,
    generalBedsAvailable: 42,
    waitTimeEmergency: '5 mins',
    contactNumber: '+1 (800) 555-0182',
    specialties: ['Pediatrics', 'Neonatal Care', 'Child Psychology'],
    facilities: ['Pediatric ER', 'Child Friendly Wards', 'Vaccination Center'],
    rating: 4.95
  },
  {
    id: 'hosp-4',
    name: 'Apex Super Specialty Care',
    city: 'East River Boulevard',
    distance: '8.4 km',
    emergencyStatus: 'Available (Normal wait)',
    icuBedsAvailable: 14,
    generalBedsAvailable: 68,
    waitTimeEmergency: '20 mins',
    contactNumber: '+1 (800) 555-0120',
    specialties: ['Oncology', 'Organ Transplant', 'Nephrology', 'Robotic Surgery'],
    facilities: ['Advanced Dialysis Unit', 'Bone Marrow Unit', 'PET-CT'],
    rating: 4.7
  }
];

const medicines = [
  {
    id: 'med-1',
    name: 'Cetirizine 10mg Tablets (Strip of 10)',
    brand: 'AllerEase',
    category: 'Allergy & Cold',
    price: 8.50,
    prescriptionRequired: false,
    inStock: true,
    rating: 4.8,
    description: 'Relieves allergy symptoms like watery eyes, runny nose, itching, and sneezing.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'med-2',
    name: 'Paracetamol 500mg Extra (Strip of 20)',
    brand: 'Panadol / Calpol',
    category: 'Pain Relief & Fever',
    price: 5.20,
    prescriptionRequired: false,
    inStock: true,
    rating: 4.9,
    description: 'Effective relief from headache, body aches, toothache, and fever.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'med-3',
    name: 'Ambroxol Cough Expectorant Syrup (100ml)',
    brand: 'Mucoclear',
    category: 'Respiratory',
    price: 11.00,
    prescriptionRequired: true,
    inStock: true,
    rating: 4.7,
    description: 'Mucolytic expectorant for productive cough with thick mucus and congestion.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'med-4',
    name: 'Hydrocortisone 1% Soothing Cream (30g)',
    brand: 'DermCure',
    category: 'Skin Care',
    price: 9.75,
    prescriptionRequired: true,
    inStock: true,
    rating: 4.85,
    description: 'Topical anti-inflammatory cream for mild eczema, dermatitis, and allergic rashes.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'med-5',
    name: 'Multivitamin & Zinc Daily Immunity (60 Capsules)',
    brand: 'VitalHealth',
    category: 'Vitamins & Supplements',
    price: 18.00,
    prescriptionRequired: false,
    inStock: true,
    rating: 4.9,
    description: 'Complete daily immunity booster with Vitamin C, D3, Zinc, and essential minerals.',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'med-6',
    name: 'Omeprazole 20mg Acid Reducer (Strip of 14)',
    brand: 'GastroShield',
    category: 'Digestive Health',
    price: 12.50,
    prescriptionRequired: false,
    inStock: true,
    rating: 4.6,
    description: 'Rapid relief and prevention for frequent heartburn, acid reflux, and indigestion.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300'
  }
];

let orders = [
  {
    id: 'ord-501',
    date: '2026-10-06',
    items: [
      { id: 'med-1', name: 'Cetirizine 10mg Tablets (Strip of 10)', price: 8.50, quantity: 1 },
      { id: 'med-2', name: 'Paracetamol 500mg Extra (Strip of 20)', price: 5.20, quantity: 2 }
    ],
    totalAmount: 18.90,
    deliveryAddress: '42 Blossom Grove, Apt 3B, New York, NY 10001',
    status: 'Delivered',
    estimatedDelivery: 'Oct 07, 2026'
  }
];

// ==========================================
// ROUTES
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// 2. Doctors API
app.get('/api/doctors', (req, res) => {
  const { category, search } = req.query;
  let result = [...doctors];

  if (category && category !== 'All') {
    result = result.filter(d => d.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(d => 
      d.name.toLowerCase().includes(term) ||
      d.specialization.toLowerCase().includes(term) ||
      d.hospital.toLowerCase().includes(term)
    );
  }

  res.json(result);
});

app.get('/api/doctors/:id', (req, res) => {
  const doc = doctors.find(d => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: 'Doctor not found' });
  res.json(doc);
});

// 3. Appointments API
app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  const { doctorId, date, time, reason, patientName, patientEmail } = req.body;
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  const newAppointment = {
    id: `apt-${Date.now().toString().slice(-4)}`,
    patientName: patientName || 'John Doe',
    patientEmail: patientEmail || 'john@example.com',
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorSpecialization: doctor.specialization,
    doctorAvatar: doctor.avatar,
    date,
    time,
    reason: reason || 'General telemedicine follow-up',
    status: 'Upcoming',
    consultationType: 'Video Call',
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newAppointment);
  res.status(201).json(newAppointment);
});

app.patch('/api/appointments/:id', (req, res) => {
  const apt = appointments.find(a => a.id === req.params.id);
  if (!apt) return res.status(404).json({ error: 'Appointment not found' });

  if (req.body.status) apt.status = req.body.status;
  res.json(apt);
});

// 4. Prescriptions API
app.get('/api/prescriptions', (req, res) => {
  res.json(prescriptions);
});

app.get('/api/prescriptions/:id', (req, res) => {
  const rx = prescriptions.find(p => p.id === req.params.id);
  if (!rx) return res.status(404).json({ error: 'Prescription not found' });
  res.json(rx);
});

// 5. Hospitals API
app.get('/api/hospitals', (req, res) => {
  const { search } = req.query;
  let result = [...hospitals];
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(h => 
      h.name.toLowerCase().includes(term) ||
      h.city.toLowerCase().includes(term) ||
      h.specialties.some(s => s.toLowerCase().includes(term))
    );
  }
  res.json(result);
});

// 6. Medicines & Orders API
app.get('/api/medicines', (req, res) => {
  const { category, search } = req.query;
  let result = [...medicines];

  if (category && category !== 'All') {
    result = result.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(m => 
      m.name.toLowerCase().includes(term) ||
      m.brand.toLowerCase().includes(term) ||
      m.category.toLowerCase().includes(term)
    );
  }

  res.json(result);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { items, totalAmount, deliveryAddress } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Cart cannot be empty' });
  }

  const newOrder = {
    id: `ord-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0],
    items,
    totalAmount: totalAmount || items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    deliveryAddress: deliveryAddress || '123 Health Ave, Suite 4B, City',
    status: 'Processing',
    estimatedDelivery: 'Within 24-48 Hours'
  };

  orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Telemedicine API server running on port ${PORT}`);
});
