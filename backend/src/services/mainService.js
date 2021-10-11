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

module.exports = {
    postGetter
}