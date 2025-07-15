import React from 'react';
import AuthForm from '@/components/AuthForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;

