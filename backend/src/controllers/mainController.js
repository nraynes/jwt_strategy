const catchAsync = require('../utils/catchAsync');
const mainService = require('../services/mainService');
const jwt = require('jsonwebtoken');

const getPosts = catchAsync(async (req, res) => {
    console.log()
    let userid;
    if (req.body.userid) {
         userid = req.body.userid
    } else {
        userid = req.user.account_id;
    }
    if (userid) {
        const postList = await mainService.postGetter(userid);
        if (postList) {
            res.send(postList);
        } else {
            res.send([]);
        }
    } else {
        res.send([])
    }
    console.log()
})

const post = catchAsync(async (req, res) => {
    const post = req.body.post;
    console.log('the post is:', req.body)
    const user = req.user
    const id = user.account_id
    console.log('verifying in posting:', user)
    mainService.createPost( id, post, res);
})

module.exports = {
    getPosts,
    post
}