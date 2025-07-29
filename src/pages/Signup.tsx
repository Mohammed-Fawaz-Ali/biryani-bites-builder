import React from 'react';
import AuthForm from '@/components/AuthForm';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald rounded-full blur-xl"></div>
      </div>
      
      {/* Decorative illustration */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="w-64 h-64 bg-gold/10 rounded-full flex items-center justify-center">
          <div className="text-gold text-6xl">🌟</div>
        </div>
      </div>
      
      <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
