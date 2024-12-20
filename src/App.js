import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import { loginUser } from './services/api';
import { Button, TextField, Box } from '@mui/material';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userSession, setUserSession] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      setUserSession(data.access_token);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box>
      {!userSession ? (
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <Chatbot userSession={userSession} />
      )}
    </Box>
  );
};

export default App;
