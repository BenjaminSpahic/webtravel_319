import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PrivateRoute - komponente koje omogućavaju pristup samo prijavljenim korisnicima
export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

// AdminRoute - komponente koje omogućavaju pristup samo administratorima
export const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  return user && user.role === 'admin' ? children : <Navigate to="/" />;
};
