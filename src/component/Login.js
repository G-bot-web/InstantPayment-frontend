import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  NavBar  from './NavBar';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import { loading } from '../redux/actions/InstantPaymentActions';
import React, { useEffect } from 'react';
import {getAuth} from '../redux/ApiCalls';
import Toaster from './toaster';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({

    text: {
        marginBottom: 13,
        background: '#f2f2f2',

    },

})
function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({ password: '', showPassword: false });
    const [loginerror, setloginerror] = useState({ email: '' })
    const history = useHistory();
    const dispatch = useDispatch();
    const mystate = useSelector((state) => state.InstantPaymentReducer);
    useEffect(() => {
        document.title = 'Instant Payments';
      }, []);
    const submithandler = (event) => {
        let valid = validate(email)
        if (valid) {
            localStorage.clear();
            dispatch(getAuth({'email':email,'password':password.password}));
        }

    }

    const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function validate(email) {
        let reg = new RegExp(/^[^\s@]+@[^\s@]+$/).test(email)
        if (!reg) {
            setloginerror({ ...loginerror, email: 'Enter valid email' })
            return false;
        }
        else {
            setloginerror({ ...loginerror, email: '' })
            return true;
        }
    }

    const responseGoogle = (response) => {
        localStorage.clear();
        localStorage.setItem('userstatus',JSON.stringify({
            login:true,
            username: response.profileObj.name
        }))
        history.push('/home');
    }

    return (

        <div className='head'>
              < NavBar/>
              <Toaster/>
            <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            <div className="login">
                <form className='myform'>
                    <TextField
                        id="filled-secondary"
                        className={classes.text}
                        error={Boolean(loginerror.email)} helperText={loginerror.email}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                        label="Email"
                    />
                    <FormControl className={classes.text}>
                        <InputLabel htmlFor="filled-password" id='passwordlable'>Password</InputLabel>
                        <Input
                            id="filled-password"
                            type={password.showPassword ? 'text' : 'password'}
                            value={password.password}
                            onChange={e => setPassword({ ...password, password: e.target.value })}
                            label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        id='icon'
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {password.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>}
                        /></FormControl>
                    <button type="button" id="submitButton" onClick={submithandler} >Sign In</button>
                </form>

            </div>
            <div className="OR">
            <Typography  variant="h6" component="h2" >
               OR
            </Typography>
            </div>
            <div>
                    <div className='google'>
                        <GoogleLogin
                            className='ganesh'
                            clientId='731528855712-8pmttnlasmmlc0bpi8cvrfafo26bmba7.apps.googleusercontent.com'
                            buttonText=" Google Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        // SameSite={'None'}
                        />
                    </div>
                </div>
            <div className='futter'>
                <span>Not a member?</span><Link to="/signup">
                    <span className="login_register" >Register Now</span>
                </Link>
            </div>
        </div>
    )
}

export default Login
