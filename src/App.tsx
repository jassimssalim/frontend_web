import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Path from './routes-path/Path';

const App: React.FC = () => {
  return (
    <Router>
      <Path />
    </Router>
  );
};

export default App;
