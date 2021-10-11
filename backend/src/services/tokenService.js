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
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

function generateRefreshToken(data) {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

function authenticateToken(req, res, next) {
    console.log('AUTHENTICATION IN PROGRESS...')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.json('FORBIDDEN')
        req.user = user;
        next();
    })
}

async function deleteToken(token, res) {
    const firstCheck = await prisma.tokens.findFirst({
        where: {
            token: token
        }
    })
    if (firstCheck) {
        await prisma.tokens.deleteMany({
            where: {
                token: token
            }
        })
        const secondCheck = await prisma.tokens.findFirst({
            where: {
                token: token
            }
        })
        if (!secondCheck) {
            console.log('Deleted Token Successfully...', secondCheck);
            if (res) {
                res.json('SUCCESS');
            } else {
                return 'SUCCESS';
            }
        } else {
            console.log('Could not delete token... ', secondCheck);
            if (res) {
                res.json('FAILURE');
            } else {
                return 'FAILURE';
            }
        }
    } else {
        if (res) {
            res.json('NOTFOUND');
        } else {
            return 'NOTFOUND';
        }
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