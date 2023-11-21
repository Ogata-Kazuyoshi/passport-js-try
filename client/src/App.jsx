// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Logout from './Logout';

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
        <Login onLogin={handleLogin} />
      )}
    </div>
    // <Router>
    //   <Routes>
    //     <Route>
    //       <Route path="/" element={<Login onLogin={handleLogin} />} />
    //       <Route path="/" element={<Logout onLogout={handleLogout} />} />
    //     </Route>
    //   </Routes>
    // </Router>
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         {authenticated ? (
    //           <li>
    //             <Link to="/logout">Logout</Link>
    //           </li>
    //         ) : (
    //           <li>
    //             <Link to="/login">Login</Link>
    //           </li>
    //         )}
    //       </ul>
    //     </nav>

    //     <Route
    //       path="/"
    //       exact
    //       render={() => (
    //         <div>
    //           <h2>Home</h2>
    //           {authenticated && <p>Welcome, {user.username}!</p>}
    //         </div>
    //       )}
    //     />
    //     <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
    //     <Route
    //       path="/logout"
    //       render={() => <Logout onLogout={handleLogout} />}
    //     />
    //   </div>
    // </Router>
  );
};

export default App;
