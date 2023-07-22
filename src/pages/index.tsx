import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Private from './Private';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<Private />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
