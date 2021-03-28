import React from 'react';
import "../static/css/Login.css";
import Button from '@material-ui/core/Button';
import { auth, provider } from "../firebase.js";

const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img 
                    src="https://logos-download.com/wp-content/uploads/2021/01/Discord_Logo_full.png" 
                />
                
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
