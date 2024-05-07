import React from 'react';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import LogIn from './pages/LoginPage';
import AboutUs from './pages/AboutUs';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        {/* Define other routes as needed */} 
      </Routes>
  );
}

export default App;
