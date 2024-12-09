import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DarkModeProvider } from "./utility/ThemeContext"; // Import the DarkModeProvider
import Path from './routes-path/Path';

const App: React.FC = () => {
  return (
    <Router>
      <DarkModeProvider>  {/* Wrap Path with DarkModeProvider */}
        <Path />
      </DarkModeProvider>
    </Router>
  );
};

export default App;
