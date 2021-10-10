const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

function generateTokens(user) {
    const retObj = {}
    retObj.accessToken = generateAccessToken(user);
    retObj.refreshToken = generateRefreshToken(user);
    return retObj;
}

function generateAccessToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403)
        req.user = user;
        next();
    })
}

async function deleteToken(token, res) {
    await prisma.tokens.deleteMany({
        where: {
            token: token
        }
    })
    console.log('Deleted Token Successfully...');
    if (res) {
        res.sendStatus(204);
    } else {
        return 'SUCCESS';
    }
}

function refreshToken(refToken) {
    return jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            deleteToken(refToken)
            return 'FORBIDDEN';
        }
        const filteredUser = {
            account_id: user.account_id,
            username: user.username
        }
        const accessToken = generateAccessToken(filteredUser)
        return accessToken;
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens,
    authenticateToken,
    refreshToken,
    deleteToken
}