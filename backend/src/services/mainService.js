const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const postGetter = async (userid) => {
    const postList = await prisma.posts.findMany({
        where: {
            account_id: userid
        }
    })
    console.log(postList)
    return postList;
}

module.exports = {
    postGetter
}