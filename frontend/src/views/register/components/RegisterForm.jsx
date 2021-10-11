import React, { useRef } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../providers/auth';

function RegisterForm(props) {
    const navigate = useNavigate();
    const un = useRef();
    const pa = useRef();
    const cp = useRef();
    const auth = useAuth();

    function handleClick() {
        navigate('/login');
    }
    async function register() {
        console.log('activated register')
        if (!un.current.value || !pa.current.value || !cp.current.value) {
            alert('You must provide all values');
        } else if (pa.current.value !== cp.current.value) {
            alert('Passwords must match.');
        } else {
            console.log('about to wait...')
            const checkRegister = await auth.register({username: un.current.value, password: pa.current.value})
            console.log('checkRegister',checkRegister)
            if (checkRegister === 'SUCCESS') {
                alert('Successfully created user');
                navigate('/login');
            } else if (checkRegister === 'ALREADYEXISTS') {
                alert('That user already exists');
            } else {
                alert('Could not create user.');
            }
        }
    }
    return (
        <div>
            <Typography variant='h2' style={{ marginTop: 20 }}>Register</Typography>
            <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <TextField inputRef={un} style={{ marginTop: 5 }} color='primary' variant='outlined' label='Username'/>
                    <TextField inputRef={pa} style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Password'/>
                    <TextField inputRef={cp} style={{ marginTop: 5 }} type='password' color='primary' variant='outlined' label='Confirm Password'/>
                    <Button onClick={()=>{register()}} style={{ marginTop: 5 }} color="primary" variant="contained">Register</Button>
                </Box>
            </form>
            <Button style={{ marginTop: 5 }} color="secondary" variant="contained" onClick={handleClick}>Login</Button>
        </div>
    );
}

export default RegisterForm;