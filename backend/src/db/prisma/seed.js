const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function seedDatabase() {
    console.log('Deleting previous data...');
    await prisma.tokens.deleteMany();
    console.log('Deleted all tokens...');
    await prisma.posts.deleteMany();
    console.log('Deleted all posts...');
    await prisma.accounts.deleteMany();
    console.log('Deleted all accounts...');
    // Everyones password is 'password'.
    const accountData = [
        {
            username: 'Mark',
            password_hash: 'y/wCjQ1HO8AyZlOJd4RXBbR9240T/G96yk3jg5WrpzdeAd9UNFxCQvQ1kjMroaIpqLv6VHsuOsyThD4raDfVAQ==',
            dynamic_salt: '7a09b254b38e56991aa6f060229b9ead',
        },
        {
            username: 'Josh',
            password_hash: '9hTwgRYksHBHAgYJEHN7OGxAOEokORPXJIYycCo5aMQKNHav8CTaLiPZxm6PevKK094UWFmi5af8nlH/gqdvSA==',
            dynamic_salt: '8db16d292e410630e7393c202de1686c',
        },
        {
            username: 'Alice',
            password_hash: 'fKdhLsgn6eNsXpk3sjeKfpTGBVA/m4CHLPyqCxHwsTRl+gb/Q/dSS1h+DHE98FLZDEDnuROE1ncK5cHc6kO2WA==',
            dynamic_salt: '39a84eac1986b8096eeac22aec8c7211',
        },
        {
            username: 'Bob',
            password_hash: 'SyNqLnc+DRE9MFYRoFx/jNZrwHYFIT/dEQWidSNIy/SMnUVmL64VC+gQvsAuM87J75O4K0kLc2YX+WkJM+YQrA==',
            dynamic_salt: '32c2223f819b247470aea5eec3610c2a',
        }
    ];
    const accountsCreated = [];
    console.log('Creating account data...');
    for(let i = 0; i < accountData.length; i++) {
        const account = await prisma.accounts.create({
            data: accountData[i]
        })
        accountsCreated.push(account);
        console.log('Created account with id:', account.account_id)
    };
    const postData = [
        {
            account_id: accountsCreated[0].account_id,
            post: 'Hi! My name is Mark! I just joined!'
        },
        {
            account_id: accountsCreated[0].account_id,
            post: 'Mark here! I love Spaghetti.'
        },
        {
            account_id: accountsCreated[0].account_id,
            post: 'I cant believe it! I just won the lottery!'
        },
        {
            account_id: accountsCreated[1].account_id,
            post: 'Im Josh. I like construction.'
        },
        {
            account_id: accountsCreated[1].account_id,
            post: 'I just had surgery.'
        },
        {
            account_id: accountsCreated[1].account_id,
            post: 'My dog just pooped on the carpet.'
        },
        {
            account_id: accountsCreated[2].account_id,
            post: 'Hello, Im Alice. I am the one used in many Crypto textbooks.'
        },
        {
            account_id: accountsCreated[2].account_id,
            post: 'I just got my data stolen!'
        },
        {
            account_id: accountsCreated[2].account_id,
            post: 'Looks like my encryption worked out after all!'
        },
        {
            account_id: accountsCreated[3].account_id,
            post: 'My name is Bob. Im Alices coworker.'
        },
        {
            account_id: accountsCreated[3].account_id,
            post: 'I just stole Alices data!'
        },
        {
            account_id: accountsCreated[3].account_id,
            post: 'Rats! I cant read Alices data because its encrypted!'
        },
    ]
    console.log('Creating post data...');
    for(let j = 0; j < postData.length; j++) {
        const post = await prisma.posts.create({
            data: postData[j]
        })
        console.log('Created post with id:', post.post_id)
    };
    prisma.$disconnect;
}
seedDatabase();
