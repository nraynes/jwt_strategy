import React, { useEffect, useRef, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Post from './components/Post';
import { useAuth } from '../../providers/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { getToken } from '../../utils/tokens';

function PostsPage(props) {
    const [userPosts, setUserPosts] = useState([]);
    const auth = useAuth();
    const navigate = useNavigate();
    const postRef = useRef();

    function getUserPosts(userObj) {
        let user;
        let postOptions;
        if (userObj) {
            user = userObj;
            postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON',
                },
                body: JSON.stringify({
                    userid: user.account_id
                })
            }
        } else {
            const accessToken = getToken('access');
            postOptions = {
                method: 'POST',
                headers: {
                    'authorization': accessToken,
                }
            }
        }
        fetch('http://localhost:3001/api/main/posts', postOptions)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                setUserPosts(data)
            })
            .catch(e => {console.log('ERROR:', e)});
    }
    useEffect(() => {
        console.log(auth.user)
        getUserPosts()
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
        console.log('myPost =', myPost)
        const accessToken = getToken('access');
        fetch('http://localhost:3001/api/main/post', {
            method: 'POST',
            headers: {
                'authorization': accessToken,
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify({
                post: myPost
            })
        })
            .then(data => data.json())
            .then((data) => {
                if (data === 'FORBIDDEN') {
                    auth.refetchUser()
                    handlePost()
                } else {
                    getUserPosts();
                }
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
            {Array.isArray(userPosts) ? userPosts.map(item => {
                return <Post post={item}/>
            }) : null}
        </div>
    );
}

export default PostsPage;