import { Box, Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router';

function LoginForm(props) {
    const navigate = useNavigate();

    function handleRegister() {
        navigate('/register');
    }

    function handleLogin() {
        
    }

    return (
        <div>
            <Typography variant='h2' style={{ marginTop: 20 }}>Login</Typography>
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <TextField style={{ marginTop: 5 }} color='primary' variant='outlined' label='Username'/>
                    <TextField style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Password'/>
                    <Button style={{ marginTop: 5 }} color="primary" variant="contained" onClick={handleLogin}>Login</Button>
                </Box>
            </form>
            <Button style={{ marginTop: 5 }} color="secondary" variant="contained" onClick={handleRegister}>Register</Button>
        </div>
    );
}

export default LoginForm;