import React from 'react';
import { initReactQueryAuth } from 'react-query-auth';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query/devtools';

const queryClient = new QueryClient();

const loadUser = async () => {
    const accessToken = 'somestring'
    return await fetch('http://localhost:3001/api/auth/me', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${accessToken}`
        }
    })
        .then(data => data.json())
        .then(user => user)
};

const loginFn = (username, password) => {
    return await fetch('http://localhost:3001/api/main/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON',
        },
        body: {
            username: username,
            password: password
        }
    })
        .then(data => data.json())
        .then(data => data.user)
};


const logoutFn = () => {
    
};

const authConfig = {
    loadUser,
    loginFn,
    logoutFn
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);

function AppProvider({ children }) {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </div>
    );
}

export default AppProvider;