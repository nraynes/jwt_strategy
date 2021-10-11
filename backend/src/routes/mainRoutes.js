const express = require('express');
const tokenService = require('../services/tokenService');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.post('/posts', tokenService.authenticateToken, mainController.getPosts)
router.post('/post', tokenService.authenticateToken, mainController.post)

module.exports = router;
