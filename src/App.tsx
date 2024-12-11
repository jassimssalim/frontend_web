import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DarkModeProvider } from "./utility/ThemeContext"; // Import the DarkModeProvider
import Path from './routes-path/Path';
import { ToastContainer } from "react-toastify";
import { GuardProvider } from "./utility/GuardContext";

const App: React.FC = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <GuardProvider>
      <DarkModeProvider>  {/* Wrap Path with DarkModeProvider */}
        <Path />
      </DarkModeProvider>
      </GuardProvider>
    </Router>
    </>
  );
};

export default App;
