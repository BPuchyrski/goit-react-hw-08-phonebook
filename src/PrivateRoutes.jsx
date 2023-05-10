import { useUser } from 'components/context/userContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const { token } = useUser();

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
