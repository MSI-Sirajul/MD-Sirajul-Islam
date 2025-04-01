
import { useState, useEffect } from 'react';
import AuthPopup from './AuthPopup';
import { useAuth } from '@/contexts/AuthContext';

const ShowAfterDelay = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // Don't show popup if user is already logged in
    if (user) return;
    
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds
    
    return () => clearTimeout(timer);
  }, [user]);
  
  return (
    <AuthPopup 
      isOpen={showPopup}
      onOpenChange={setShowPopup}
    />
  );
};

export default ShowAfterDelay;
