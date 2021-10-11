const catchAsync = require('../utils/catchAsync');
const mainService = require('../services/mainService');

const getPosts = catchAsync(async (req, res) => {
    const { userid } = req.body
    const postList = await mainService.postGetter(userid);
    if (postList) {
        res.send(postList);
    } else {
        res.json('NOPOSTS');
    }
})

const post = catchAsync(async (req, res) => {
    const { post, id } = req.body;
    mainService.createPost( id, post, res);
})

module.exports = {
    getPosts,
    post
}