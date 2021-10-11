const tokenService = require('./tokenService');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

async function loginUserWithUsernameAndPassword(username, password, res) {
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
                        
                        const retObj = { user: filteredUser, tokens: { accessToken: `Bearer ${accessToken}`, refreshToken: `Bearer ${refreshToken}` }};
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
        if (err) res.json(null)
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

async function register(username, password, res) {
    console.log('activated register on server.')
    console.log('Username provided:', username, ' Password provided:', password)
    if (username && password) {
        console.log('username and password were provided.')
        const dynamicSalt = crypto.randomBytes(16).toString('hex');
        console.log(dynamicSalt)
        crypto.scrypt(password, `${dynamicSalt}${process.env.STATIC_SALT}`, 64, {}, async (err, key) => {
            const passHash = key.toString('base64');
            console.log('Pass Hash:', passHash)
            const isUser = await prisma.accounts.findFirst({
                where: {
                    username: username
                }
            })
            console.log('isUser:', isUser)
            if (isUser) {
                console.log();
                console.log('Sending already exists message...')
                console.log();
                res.json('ALREADYEXISTS')
            } else {
                const registeredUser = await prisma.accounts.create({
                    data: {
                        username: username,
                        password_hash: passHash,
                        dynamic_salt: dynamicSalt
                    }
                })
                console.log('the user is:', registeredUser)
                if (registeredUser.username === username) {
                    res.json('SUCCESS');
                } else {
                    res.json(null)
                }
            }
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    loginUserWithUsernameAndPassword,
    token,
    authMe,
    register
}