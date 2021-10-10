import { useRoutes } from 'react-router-dom';
import publicRoutes from './public';
import protectedRoutes from './protected';

function AppRoutes(props) {
    const routes = true ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes])
    return <>{element}</>;
}

export default AppRoutes;