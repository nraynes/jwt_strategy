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

module.exports = {
    getPosts
}