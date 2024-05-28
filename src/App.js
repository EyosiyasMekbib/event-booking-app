import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Home from  './components/home';
import Auth from  './components/authentication';

// CSS styles
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
  },
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div style={styles.app}>
          <Routes>
            <Route
              path="/"
              element={
                // <PrivateRoute>
                  <Home />
                // </PrivateRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
