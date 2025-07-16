
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  className?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  className = "",
  label = "Back" 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleBack}
      className={`mb-6 border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 ${className}`}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
