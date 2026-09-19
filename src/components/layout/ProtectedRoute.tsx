import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useEduNexusStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
