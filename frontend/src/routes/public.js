import LoginPage from '../views/login/LoginPage';
import RegisterPage from '../views/register/RegisterPage';

const publicRoutes = [
    { path: '/login', element: <LoginPage/> },
    { path: '/register', element: <RegisterPage/> }
];

export default publicRoutes;