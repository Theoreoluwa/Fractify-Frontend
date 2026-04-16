import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AuthContext } from './authContextValue';

function getInitialToken() {
  return localStorage.getItem('token') || null;
}


function getInitialUser() {
  const saved = localStorage.getItem('user');
  return saved ? JSON.parse(saved) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  const login = (tokenData, userData) => {
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}