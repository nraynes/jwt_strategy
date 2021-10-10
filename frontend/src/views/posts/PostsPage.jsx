import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Post from './components/Post';

function PostsPage(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user] = useState({
        account_id: null,
        username: null
    });
    function getUserPosts(user) {
        fetch('http://localhost:3001/api/main/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: {
                userid: user.account_id
            }
        })
            .then(data => data.json())
            .then(data => setUserPosts(data))
            .catch(e => {console.log(e)});
    }
    useEffect(() => {
        getUserPosts(user)
    },[user])
    return (
        <div>
            <Typography variant='h2' style={{ marginTop: 20 }}>Posts</Typography>
            {userPosts.map(item => {
                return <Post post={item}/>
            })}
        </div>
    );
}

export default PostsPage;