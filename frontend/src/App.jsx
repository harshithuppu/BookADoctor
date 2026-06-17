import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserHome from './pages/User/UserHome';
import AdminHome from './pages/Admin/AdminHome';
import Notification from './pages/Notification';
import AdminAppointment from './pages/Admin/AdminAppointment';
import DoctorHome from './pages/Doctor/DoctorHome';

import './App.css';

function App() {
  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userData')));
  const isLoggedIn = !!userData;

  // Listen for storage changes (optional but good)
  React.useEffect(() => {
    const handleStorageChange = () => {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/userhome" 
            element={isLoggedIn ? <UserHome /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/adminhome" 
            element={isLoggedIn && userData.role === 'admin' ? <AdminHome /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/notifications" 
            element={isLoggedIn ? <Notification /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin-appointments" 
            element={isLoggedIn && userData.role === 'admin' ? <AdminAppointment /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/doctorhome" 
            element={isLoggedIn && userData.isdoctor ? <DoctorHome /> : <Navigate to="/login" />} 
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
