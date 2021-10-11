import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './auth';
import ContentProvider from './ContentProvider';

const queryClient = new QueryClient();

export function AppProvider({ children }) {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ContentProvider>
                    {children}
                </ContentProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default AppProvider;