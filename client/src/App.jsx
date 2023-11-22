// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/auth/checkAuth',
        {
          withCredentials: true,
        }
      );
      if (response.data.authenticated) {
        setAuthenticated(true);
        console.log('res.data.user :', response.data.user);
        setUser(response.data.user);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => {
    checkAuth();
  };

  const handleLogout = () => {
    checkAuth();
  };

  return (
    <div>
      {authenticated ? (
        <Logout onLogout={handleLogout} />
      ) : (
        <>
          <Signup onLogin={handleLogin} />
          <Login onLogin={handleLogin} />
        </>
      )}
    </div>
  );
};

export default App;
