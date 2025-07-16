
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center">
      <div className="text-center px-4">
        <div className="absolute top-8 left-8">
          <BackButton to="/" />
        </div>
        
        <div className="text-9xl font-bold text-emerald/20 mb-4">404</div>
        <h1 className="text-4xl font-bold text-emerald mb-4">Page Not Found</h1>
        <p className="text-emerald/70 text-lg mb-2 font-arabic">الصفحة غير موجودة</p>
        <p className="text-emerald/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-emerald hover:bg-emerald/90 text-white px-6 py-3"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-emerald text-emerald hover:bg-emerald hover:text-white px-6 py-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
