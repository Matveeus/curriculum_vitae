import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Private from './Private';
import Employees from './Employees';
import Projects from './Projects';
import Cvs from './Cvs';
import CvDetails from './CvDetailes';
import Departments from './Departments';
import Positions from './Positions';
import Skills from './Skills';
import Languages from './Languages';
import User from './User';
import UserProfile from './UserProfile';
import ProjectDetails from './ProjectDetails';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<Private />}>
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:id" element={<User />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path="skills" element={<p>Skills</p>} />
              <Route path="languages" element={<p>Languages</p>} />
              <Route path="cvs" element={<p>CVs</p>} />
            </Route>
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="cvs" element={<Cvs />} />
            <Route path="cvs/:id/details" element={<CvDetails />} />
            <Route path="departments" element={<Departments />} />
            <Route path="positions" element={<Positions />} />
            <Route path="skills" element={<Skills />} />
            <Route path="languages" element={<Languages />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
