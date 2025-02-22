
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface PrivateRouteProps {
  Component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const { session } = useAuth();

  return session ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
