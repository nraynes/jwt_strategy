import { initReactQueryAuth } from 'react-query-auth';
import { setToken, getToken, clearTokens } from '../utils/tokens';
import CircularProgress from '@mui/material/CircularProgress';

const loadUser = async () => {
    console.log('Load User Function was activated!');
    const accessToken = getToken('access');
    if (accessToken) {
        async function loadMe(token) {
            const user = await fetch('http://localhost:3001/api/auth/me', {
                method: 'GET',
                headers: {
                    'authorization': token
                }
            })
                .then(data => data.json())
                .then(user => user)
            return user;
        }
        const user = await loadMe(accessToken);
        if (user) {
            console.log('first check:', user);
            return user;
        } else {
            console.log('refreshing');
            const refreshToken = getToken('refresh');
            if (refreshToken) {
                const newToken = await fetch('http://localhost:3001/api/auth/token', {
                    method: 'POST',
                    headers: {
                        'authorization': refreshToken
                    }
                })
                    .then(data => data.json())
                    .then(user => user)
                if (newToken !== 'FORBIDDEN') {
                    const checkSet = setToken('access', newToken.accessToken)
                    if (checkSet) {
                        const user = await loadMe(checkSet);
                        if (user) {
                            console.log('needed to refresh:', user);
                            return user;
                        }
                    }
                }
            }
        }
    }
    console.log('user returned null')
    return null;
};

const loginFn = async (loginVals) => {
    console.log(loginVals)
    const errors = ['ERRPASS', 'ERRNOUSER', 'ERRSTORE']
    const { username, password } = loginVals;
    if (username && password) {
        const retObj = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(data => data.json())
            .then(data => data)
        console.log(retObj)
        if (!errors.includes(retObj)) {
            const { user, tokens } = retObj;
            const accessSet = setToken('access', tokens.accessToken);
            const refreshSet = setToken('refresh', tokens.refreshToken);
            if (refreshSet && accessSet) {
                console.log('Successfully set token cookies...');
            } else {
                console.log('Could not set token cookies...');
            }
            return user;
        } else {
            return retObj;
        }
    } else {
        return null;
    }
};


const logoutFn = async () => {
    const refreshToken = getToken('refresh');
    if (refreshToken) {
        const result = await fetch('http://localhost:3001/api/auth/logout', {
            method: 'DELETE',
            headers: {
                "authorization": refreshToken
            }
        })
            .then(data => data.json())
            .then(data => data);
        if (result === 'SUCCESS') {
            const checkMe = clearTokens();
            if (checkMe) {
                return 'SUCCESS';
            }
        }
    }
    return null;
};

const registerFn = async (registrationInfo) => {
    const { username, password } = registrationInfo;
    const userRegistered = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(data => data.json())
        .then(data => data)
    console.log('The user that register is:', userRegistered)
    window.checkReg = userRegistered;
};

const authConfig = {
    loadUser,
    loginFn,
    logoutFn,
    registerFn,
    LoaderComponent() {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    },
    ErrorComponent() {
        return (
            <div>
                <h1 style={{color: 'red'}}>Error!</h1>
            </div>
        );
    }
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);