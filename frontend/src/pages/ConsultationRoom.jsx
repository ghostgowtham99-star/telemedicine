import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  FileText, 
  Send, 
  Share2, 
  Settings, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Pill,
  ArrowRight
} from 'lucide-react';
import { fetchDoctorById } from '../services/api';

export default function ConsultationRoom() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(145); // seconds
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Secure end-to-end encrypted room initiated.' },
    { sender: 'doctor', text: 'Hello! I can hear you clearly. How are you feeling today?' },
    { sender: 'patient', text: 'Hi Doctor, I have had a continuous dry cough and slight fever since yesterday.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [prescriptionReady, setPrescriptionReady] = useState(false);

  useEffect(() => {
    fetchDoctorById(doctorId || 'doc-1').then(setDoctor);

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [doctorId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = { sender: 'patient', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate doctor responding after 1.5 seconds
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. Based on your symptoms, I am issuing a prescription for an antihistamine and cough expectorant.'
        }
      ]);
      setPrescriptionReady(true);
    }, 1500);
  };

  return (
    <div style={{
      background: '#09131f',
      minHeight: 'calc(100vh - 4.5rem)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Consultation Bar */}
      <div style={{
        padding: '0.75rem 1.5rem',
        background: 'rgba(15, 23, 42, 0.85)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 10px #10b981'
          }}></div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
            Consultation with {doctor ? doctor.name : 'Medical Specialist'}
          </span>
          <span style={{
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            color: '#38bdf8'
          }}>
            {doctor ? doctor.specialization : 'Telehealth'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <Clock size={16} />
            <span>{formatTime(callDuration)}</span>
          </div>

          {prescriptionReady && (
            <Link
              to="/prescriptions/rx-201"
              style={{
                background: 'var(--teal-600)',
                color: 'white',
                padding: '0.4rem 0.9rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                animation: 'pulse-ring 2s infinite'
              }}
            >
              <FileText size={15} />
              <span>Prescription Issued! View Now</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Video & Chat Area */}
      <div style={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: showChat ? '1fr 340px' : '1fr',
        gap: '1rem',
        padding: '1rem',
        overflow: 'hidden'
      }}>
        {/* Video Feeds Container */}
        <div style={{
          position: 'relative',
          background: '#020617',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Main Doctor Video Feed */}
          {doctor && (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={doctor.avatar}
                alt={doctor.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.92,
                  filter: 'contrast(1.05)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)'
              }} />

              {/* Doctor Label */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{doctor.name} (Doctor)</span>
              </div>
            </div>
          )}

          {/* Self Camera (Picture in Picture) */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            width: '180px',
            height: '130px',
            background: videoOn ? '#1e293b' : '#0f172a',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {videoOn ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                alt="Patient Camera"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>
                <VideoOff size={22} style={{ margin: '0 auto 4px' }} />
                Camera Off
              </div>
            )}
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '6px',
              fontSize: '0.7rem',
              background: 'rgba(0,0,0,0.6)',
              padding: '1px 6px',
              borderRadius: '4px'
            }}>
              You ({micOn ? 'Mic On' : 'Muted'})
            </div>
          </div>
        </div>

        {/* Sidebar: Chat & Clinical Notes */}
        {showChat && (
          <div style={{
            background: '#0f172a',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MessageSquare size={18} color="var(--teal-400)" />
              <span>In-Call Notes & Chat</span>
            </div>

            {/* Message Stream */}
            <div style={{
              flexGrow: 1,
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'patient' ? 'flex-end' : m.sender === 'doctor' ? 'flex-start' : 'center',
                    background: m.sender === 'patient' 
                      ? 'var(--teal-700)' 
                      : m.sender === 'doctor' 
                      ? '#1e293b' 
                      : 'rgba(255,255,255,0.08)',
                    color: m.sender === 'system' ? '#94a3b8' : 'white',
                    fontSize: m.sender === 'system' ? '0.75rem' : '0.85rem',
                    padding: '0.6rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    maxWidth: m.sender === 'system' ? '100%' : '85%',
                    lineHeight: 1.4
                  }}
                >
                  {m.sender === 'doctor' && (
                    <strong style={{ display: 'block', fontSize: '0.75rem', color: 'var(--teal-300)', marginBottom: '2px' }}>
                      {doctor ? doctor.name : 'Doctor'}
                    </strong>
                  )}
                  {m.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <input
                type="text"
                placeholder="Type medical note or question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flexGrow: 1,
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: 'var(--radius-md)',
                  color: 'white',
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--teal-600)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.8rem',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Video Call Controls Bar */}
      <div style={{
        padding: '1rem',
        background: '#0f172a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <button
          onClick={() => setMicOn(!micOn)}
          className="btn"
          style={{
            background: micOn ? '#334155' : '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            padding: 0
          }}
          title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        <button
          onClick={() => setVideoOn(!videoOn)}
          className="btn"
          style={{
            background: videoOn ? '#334155' : '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            padding: 0
          }}
          title={videoOn ? 'Turn Video Off' : 'Turn Video On'}
        >
          {videoOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
        </button>

        <button
          onClick={() => setShowChat(!showChat)}
          className="btn"
          style={{
            background: showChat ? 'var(--teal-600)' : '#334155',
            color: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            padding: 0
          }}
          title="Toggle In-Call Chat"
        >
          <MessageSquare size={20} />
        </button>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to conclude this video consultation?')) {
              navigate('/dashboard');
            }
          }}
          className="btn"
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.75rem 1.75rem',
            borderRadius: '999px',
            fontWeight: 700
          }}
        >
          <PhoneOff size={18} />
          <span>End Consultation</span>
        </button>
      </div>
    </div>
  );
}
