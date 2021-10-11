const express = require('express');
const tokenService = require('../services/tokenService');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.post('/posts', mainController.getPosts)
router.post('/post', mainController.post)

module.exports = router;
