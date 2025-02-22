// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Connect to your PocketBase instance

const ProtectedRoute = () => {
  // Check if the user is authenticated
  const isAuthenticated = pb.authStore.isValid;

  // If authenticated, render the child components (e.g., ProfilePanel)
  // If not authenticated, redirect to the /auth route
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;