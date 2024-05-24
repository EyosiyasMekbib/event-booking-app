import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1e40af',
  },
  toggleLink: {
    marginTop: '10px',
    color: '#2563eb',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password || (!isLogin && !email)) {
      setError('All fields are required');
      return;
    }

    if (isLogin) {
      // Perform login
      const result = login(username, password);
      if (result) {
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Mock signup logic
      setSuccess('Signup successful! You can now log in.');
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</h2>
        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        {!isLogin && (
          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
        )}
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <div style={styles.toggleLink} onClick={handleToggle}>
          {isLogin ? 'Don\'t have an account? Signup' : 'Already have an account? Login'}
        </div>
      </form>
    </div>
  );
};

export default Auth;
