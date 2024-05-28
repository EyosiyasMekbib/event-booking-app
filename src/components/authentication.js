import React, { useState } from 'react';
import { useAuth } from './AuthContext';

// CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    backgroundImage: `url('https://img.freepik.com/free-photo/young-african-woman-running-isolated-white-studio-background-one-female-runner-jogger-silhouette-jogging-athlete_155003-34511.jpg?w=996&t=st=1716809312~exp=1716809912~hmac=93fc785a10d07587e5ae088e1d9d31c23aa3e06bf3fcd2b2137d957c68b82405')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '20px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px 20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
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
    backgroundColor: '#111111',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#111111',
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
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!username || !password || (!isLogin && (!email || !weight || !height))) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters');
      setLoading(false);
      return;
    }

    if (password.length < 6 || password.length > 40) {
      setError('Password must be between 6 and 40 characters');
      setLoading(false);
      return;
    }

    if (isLogin) {
      const result = await login(username, password);
      setLoading(false);
      if (!result) {
        setError('Invalid username or password');
      }
    } else {
      const result = await signup(username, email, password, height, weight, role);
      setLoading(false);
      if (result) {
        setSuccess('Signup successful! You can now log in.');
        setTimeout(() => {
          setIsLogin(true);
          setSuccess('');
        }, 2000);
      } else {
        setError('Signup failed');
      }
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
          <>
            <div style={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={styles.input}
              />
            </div>
          </>
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
          disabled={loading}
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Signup'}
        </button>
        <div style={styles.toggleLink} onClick={handleToggle}>
          {isLogin ? 'Don\'t have an account? Signup' : 'Already have an account? Login'}
        </div>
      </form>
    </div>
  );
};

export default Auth;
