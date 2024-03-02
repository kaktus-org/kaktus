import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store'; // Import your store correctly
import { Navigate, Outlet } from 'react-router-dom';

const SecureRoute: React.FC = () => {
  const { isAdmin } = useSelector((state: RootState) => state.auth);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default SecureRoute;
