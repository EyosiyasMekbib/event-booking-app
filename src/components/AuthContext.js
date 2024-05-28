import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await fetch('https://5z9sttfs-8080.euw.devtunnels.ms/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        setIsAuthenticated(true);
        setUser(data);
        navigate('/');
        return true;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (username, email, password, height, weight) => {
    try {
      const response = await fetch('https://5z9sttfs-8080.euw.devtunnels.ms/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, height, weight }),
      });
      if (response.ok) {
        navigate('/auth');
        return true;
      }
      throw new Error('Signup failed');
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
