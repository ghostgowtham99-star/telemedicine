import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('telemed_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 234-5678',
      bloodGroup: 'O+',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  const login = (userData) => {
    const activeUser = {
      id: userData.id || `usr-${Date.now().toString().slice(-4)}`,
      name: userData.name || 'John Doe',
      email: userData.email,
      phone: userData.phone || '+1 (555) 234-5678',
      bloodGroup: userData.bloodGroup || 'O+',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    setUser(activeUser);
    localStorage.setItem('telemed_user', JSON.stringify(activeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('telemed_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
