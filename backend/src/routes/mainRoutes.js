const express = require('express');
const tokenService = require('../services/tokenService');

const router = express.Router();

router.get('/posts', tokenService.authenticateToken, (req,res) => {
    const { user } = req;
})

module.exports = router;
