import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../assets/styles/style.css';
import Home from '../components/Home';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
