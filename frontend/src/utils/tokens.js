import { getCookie, setCookie, clearCookie } from './cookies';

export function getToken(type) {
    const options = ['access', 'refresh'];
    if (!options.includes(type)) {
        throw new Error('Invalid Type');
    } else {
        const accessToken = getCookie(`${type}Token`);
        if (accessToken.match('Bearer')) {
            return accessToken;
        } else {
            return null;
        }
    }
}

export function setToken(type, token) {
    const options = ['access', 'refresh'];
    if (!options.includes(type)) {
        throw new Error('Invalid Type');
    } else if (!token) {
        if (token === null) {
            clearCookie(`${type}Token`)
            const checker = getCookie(`${type}Token`);
            console.log('Checked cleared cookie:', checker)
            if (!checker) {
                return 'SUCCESS';
            } else {
                return 'FAILURE';
            }
        } else {
            throw new Error('Invalid Token');
        }
    } else {
        let tokenToSet = '';
        let expDays = 1;
        if (type === 'refresh') {
            expDays = 30;
        }
        if (token.match('Bearer')) {
            tokenToSet = token;
        } else {
            tokenToSet = `Bearer ${token}`;
        }
        setCookie(`${type}Token`, tokenToSet, expDays);
        const returnedToken = getToken(type);
        if (returnedToken) {
            return returnedToken;
        } else {
            return null;
        }
    }
}

export function clearTokens() {
    const checkAccess = setToken('access', null)
    const checkRefresh = setToken('refresh', null)
    if (checkRefresh === 'SUCCESS' && checkAccess === 'SUCCESS') {
        return 'SUCCESS';
    } else {
        return null;
    }
}
