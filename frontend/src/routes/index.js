import { useRoutes } from 'react-router-dom';
import publicRoutes from './public';
import protectedRoutes from './protected';
import { useAuth } from '../providers/auth';

function AppRoutes(props) {
    const auth = useAuth();
    const routes = auth.user ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes])
    return <>{element}</>;
}

export default AppRoutes;