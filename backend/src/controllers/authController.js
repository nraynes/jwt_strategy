const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const {username, password} = req.body;
        await authService.loginUserWithUsernameAndPassword(username, password, req, res);
    }
})

const token = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const accessToken = await authService.token(token);
    if (accessToken === 'FORBIDDEN') {
        res.sendStatus(403);
    } else {
        res.json(accessToken);
    }
})

const me = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const { accessToken } = await authService.token(token);
    authService.authMe(accessToken, res);
})

const logout = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    tokenService.deleteToken(token, res);
})

module.exports = {
    login,
    token,
    logout,
    me
};
