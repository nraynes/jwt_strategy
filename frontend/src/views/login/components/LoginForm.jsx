import { Box, Button, TextField, Typography } from '@material-ui/core';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../providers/auth';

function LoginForm(props) {
    const navigate = useNavigate();
    const auth = useAuth();
    const un = useRef();
    const pw = useRef();

    function handleRegister() {
        navigate('/register');
    }

    async function handleLogin(username, password) {
        if (!username && !password) {
            alert('Please provide a username and password.')
        } else if (!username) {
            alert('Please provide a username.')
        } else if (!password) {
            alert('Please provide a password.')
        } else {
            const user = await auth.login({username: username, password: password});
            if (!user) {
                alert('There was a server error.')
            } else if (user === 'ERRPASS') {
                alert('Invalid Password.')
            } else if (user === 'ERRNOUSER') {
                alert('There is no user by that username.')
            } else if (user === 'ERRSTORE') {
                alert('There was a problem logging in the user.')
            } else {
                auth.user = user;
                console.log(auth.user);
                auth.user ? navigate('/posts') : alert('An unknown error has occured.');
            }
        }
    }

    return (
        <div>
            <Typography variant='h2' style={{ marginTop: 20 }}>Login</Typography>
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <TextField inputRef={un} style={{ marginTop: 5 }} color='primary' variant='outlined' label='Username'/>
                    <TextField inputRef={pw} style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Password'/>
                    <Button style={{ marginTop: 5 }} color="primary" variant="contained" onClick={()=> {handleLogin(un.current.value, pw.current.value)}}>Login</Button>
                </Box>
            </form>
            <Button style={{ marginTop: 5 }} color="secondary" variant="contained" onClick={handleRegister}>Register</Button>
        </div>
    );
}

export default LoginForm;