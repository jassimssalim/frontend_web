import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../main_paths/Login';
import Home from '../main_paths/Home';
import ProtectedRoute from './ProtectedRoute';

const Path: React.FC = () => {
  return (
    <Routes>
      {/* Route for Login (Entry) */}
      <Route path="/Entry" element={<Login />} />

      {/* Default route */}
      <Route path="/" element={<Login />} />

      {/* Protected route for Home */}
      <Route
        path="/Home"
        element={<ProtectedRoute component={Home} />} // Pass Home component directly
      />
    </Routes>
  );
};

export default Path;
