import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegistrationPage from './pages/RegistrationPage';
import CompilerPage from './pages/CompilerPage';
import SubmissionsPage from './pages/SubmissionsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/compiler" element={<CompilerPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
      </Routes>
    </Router>
  );
}