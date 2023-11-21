// Logout.jsx
import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/v1/auth/logout',
        {
          withCredentials: true,
        }
      );
      if (response.data.message === 'Logout successful') {
        onLogout();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
