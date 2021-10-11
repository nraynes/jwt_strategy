import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Post from './components/Post';
import { useAuth } from '../../providers/auth';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

function PostsPage(props) {
    const [userPosts, setUserPosts] = useState([]);
    const auth = useAuth();
    const navigate = useNavigate();

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

    return (
        <div>
            <Button style={{ marginTop: 5, marginBottom: 5 }} color="primary" variant="contained" onClick={handleLogout}>Logout</Button>
            <Typography variant='h2' style={{ marginTop: 20 }}>Posts</Typography>
            {userPosts.map(item => {
                return <Post post={item}/>
            })}
        </div>
    );
}

export default PostsPage;