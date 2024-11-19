import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../main_paths/Login';

import Home from '../main_paths/Home';

const Path: React.FC = () => {
  return (
    <Routes>
      <Route path="/Entry" element={<Login />} />
      <Route path="/" element={<Login />} />  {/* Default route */}
      <Route path="/Home" element={<Home />} />  

    </Routes>
  );
};

export default Path;
