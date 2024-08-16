import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';

const Logout: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      setError(null);
      const { error } = await supabase.auth.signOut();

      if (error) {
        setError(error.message);
        toast.error(`Logout failed: ${error.message}`);
      } else {
        toast.success('Successfully logged out');
        navigate('/');
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
