import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function ContentProvider({children}) {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            if (location.pathname === '/login' || location.pathname === '/register') {
                navigate('/posts');
            }
        } else {
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                navigate('/login');
            }
        }
    }, [auth, location, navigate])
    
    return (
        <div>
            {children}
        </div>
    );
}

export default ContentProvider;