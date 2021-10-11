const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const postGetter = async (userid) => {
    if (typeof userid === 'number') {
        const postList = await prisma.posts.findMany({
            where: {
                account_id: userid
            }
        })
        console.log(postList)
        return postList;
    } else {
        return [];
    }
}

const createPost = async (id, post, res) => {
    const createdPost = await prisma.posts.create({
        data: {
            account_id: id,
            post: post
        }
    })
    if (createdPost) {
        res.json('SUCCESS');
    } else {
        res.json('FAILURE');
    }
}

module.exports = {
    postGetter,
    createPost
}