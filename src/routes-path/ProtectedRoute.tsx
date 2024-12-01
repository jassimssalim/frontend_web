import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  // Check authentication status from local storage
  const isAuthenticated = !!localStorage.getItem('userLoggedIn'); 

  console.log(isAuthenticated);
  
  return isAuthenticated ? <Component /> : <Navigate to="/entry" />;
};

export default ProtectedRoute;
