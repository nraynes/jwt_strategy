const authService = require('../services/authService');
const tokenService = require('../services/tokenService');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const {username, password} = req.body;
        await authService.loginUserWithUsernameAndPassword(username, password, res);
    }
})

const token = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const accessToken = await authService.token(token);
    res.json(accessToken);
})

const me = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    authService.authMe(token, res);
})

const logout = catchAsync(async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    tokenService.deleteToken(token, res);
})

const register = catchAsync(async (req, res) => {
    const { username, password } = req.body
    console.log(username, password, req.body)
    authService.register(username, password, res)
})

module.exports = {
    login,
    token,
    logout,
    me,
    register
};
