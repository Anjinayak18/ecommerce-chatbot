import React, { useState } from 'react';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { loginUser } from '../services/api';
import './Login.css'; // Import the custom CSS

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(username, password);
      // Handle successful login
      onLoginSuccess(response.access_token); // Example callback to handle successful login
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
    setLoading(false);
  };

  return (
    <Box className="login-container">
      <h2>Login to Your Account</h2>
      {error && <p className="error">{error}</p>}
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleLogin}
        disabled={loading}
        fullWidth
        variant="contained"
        color="primary"
      >
        {loading ? <div className="spinner"></div> : 'Login'}
      </Button>
      <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
    </Box>
  );
};

export default Login;
