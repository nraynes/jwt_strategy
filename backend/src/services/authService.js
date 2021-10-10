const tokenService = require('./tokenService');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const { readdirSync } = require('fs');

const prisma = new PrismaClient()

async function loginUserWithUsernameAndPassword(username, password, req, res) {
    const user = await prisma.accounts.findUnique({
        where: {
            username: username
        }
    })
    if (user) {
        crypto.scrypt(password, `${user.dynamic_salt}${process.env.STATIC_SALT}`, 64, {}, async (err, key) => {
            if (user.password_hash === key.toString('base64')) {
                const filteredUser = {
                    account_id: user.account_id,
                    username: user.username
                }
                const { accessToken, refreshToken } = tokenService.generateTokens(filteredUser);
                const sendTokenEntry = {
                    account_id: user.account_id,
                    token: refreshToken
                }
                const reBackToken = await prisma.tokens.create({
                    data: {
                        account_id: user.account_id,
                        token: refreshToken
                    }
                })
                if (reBackToken.account_id === sendTokenEntry.account_id &&
                    reBackToken.token === sendTokenEntry.token &&
                    reBackToken.token_id) {
                        
                        const retObj = { user: filteredUser, tokens: { accessToken: accessToken, refreshToken: refreshToken }};
                        res.json(retObj);
                } else {
                    res.json('ERRSTORE');
                }
            } else {
                res.json('ERRPASS');
            }
        })
    } else {
        res.json('ERRNOUSER');
    }
};

async function authMe(accessToken, res) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403)
        const filteredUser = {
            account_id: user.account_id,
            username: user.username
        }
        res.json(filteredUser)
    })
};

async function token(refreshToken) {
    const verifiedToken = await prisma.tokens.findFirst({
        where: {
            token: refreshToken
        }
    })
    if (verifiedToken) {
        const accessToken = tokenService.refreshToken(verifiedToken.token);
        return { accessToken: accessToken };
    }
}

module.exports = {
    loginUserWithUsernameAndPassword,
    token,
    authMe
}