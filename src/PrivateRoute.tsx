
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = (Component) => {
  const { session } = useAuth();

  return session ? <Component /> : <Navigate to="/login" />
};

export default PrivateRoute;
