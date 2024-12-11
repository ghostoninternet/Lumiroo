import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

function ProtectedRoute() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in');
    }
  }, [user, navigate]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;