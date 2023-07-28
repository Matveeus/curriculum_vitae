import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Private from './Private';
import User from './User';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<Private />}>
            <Route path="employees/:id" element={<User />}>
              <Route path="profile" element={<p>Profile</p>} />
              <Route path="skills" element={<p>Skills</p>} />
              <Route path="languages" element={<p>Languages</p>} />
              <Route path="cvs" element={<p>CVs</p>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
