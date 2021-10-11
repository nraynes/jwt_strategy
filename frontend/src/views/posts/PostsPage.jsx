import React, { useEffect, useRef, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Post from './components/Post';
import { useAuth } from '../../providers/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';

function PostsPage(props) {
    const [userPosts, setUserPosts] = useState([]);
    const auth = useAuth();
    const navigate = useNavigate();
    const postRef = useRef();

    function getUserPosts(user) {
        console.log(user.account_id)
        fetch('http://localhost:3001/api/main/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify({
                userid: user.account_id
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                setUserPosts(data)
            })
            .catch(e => {console.log('ERROR:', e)});
    }
    useEffect(() => {
        console.log(auth.user)
        getUserPosts(auth.user)
    },[auth])

    function handleLogout() {
        auth.user = null;
        const checkMe = auth.logout();
        if (checkMe === 'SUCCESS') {
            alert('Logged out successfully.')
            navigate('/login');
        }
    }

    function handlePost() {
        let myPost;
        if (postRef.current.value) {
            myPost = postRef.current.value
        } else {
            myPost = '';
        }
        fetch('http://localhost:3001/api/main/post', {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify({
                id: auth.user.account_id,
                post: myPost
            })
        })
            .then(() => {
                getUserPosts(auth.user);
            })
    }

    return (
        <div>
            <Box sx={{ mt: 10 }}>
                <Button style={{ marginTop: 5, marginBottom: 5, marginRight: 5 }} color="primary" variant="contained" onClick={handleLogout}>Logout</Button>
                <TextField inputRef={postRef} variant='outlined' color='primary' label='Post'></TextField>
                <Button style={{ marginTop: 5, marginBottom: 5, marginLeft: 5 }} color="primary" variant="contained" onClick={handlePost}>Add Post</Button>
            </Box>
            <Typography variant='h2' style={{ marginTop: 20 }}>Posts</Typography>
            {userPosts.map(item => {
                return <Post post={item}/>
            })}
        </div>
    );
}

export default PostsPage;