import React, { useRef } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';

function RegisterForm(props) {
    const navigate = useNavigate();
    const un = useRef();
    const pa = useRef();
    const cp = useRef();

    function handleClick() {
        navigate('/login');
    }
    function register() {
        alert('you submitted the form')
        navigate('/login');
    }
    return (
        <div>
            <Typography variant='h2' style={{ marginTop: 20 }}>Register</Typography>
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <TextField inputRef={un} style={{ marginTop: 5 }} color='primary' variant='outlined' label='Username'/>
                    <TextField inputRef={pa} style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Password'/>
                    <TextField inputRef={cp} style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Confirm Password'/>
                    <Button onClick={register} style={{ marginTop: 5 }} color="primary" variant="contained">Register</Button>
                </Box>
            </form>
            <Button style={{ marginTop: 5 }} color="secondary" variant="contained" onClick={handleClick}>Login</Button>
        </div>
    );
}

export default RegisterForm;