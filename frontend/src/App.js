import React from 'react';
 import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import LogIn from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar} from './components/navbar'
import{Shop}from "./pages/shop/shop"
import{Cart}from  "./pages/cart/cart"
import './App.css';

function App() {
  return (
      <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/Cart"element={<Cart/>} />
        <Route path="/Signup" element={<SignIn />} />
        <Route path="/Login" element={<LogIn />} />
        <Route path="/HomePage" element={<HomePage />} />
        {/* Define other routes as needed */} 
      </Routes>
      </>
  );
}

export default App;
