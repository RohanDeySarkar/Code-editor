import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';

import {auth, provider} from '../firebase';

function Login() {

    const signIn = (e) => {
        e.preventDefault();
        
        auth
        .signInWithPopup(provider)
        .catch(err => alert(err.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png"
                    alt=""
                />
                <Button
                    startIcon={ 
                        <img
                            style={{
                                height: "30px",
                                paddingRight: "20px"
                            }} 
                            src="https://hrcdn.net/community-frontend/assets/google-colored-20b8216731.svg"  
                        />
                    }
                    onClick={signIn}
                    variant='outlined'
                >
                    Sign in
                </Button>
            </div>
        
        </div>
    )
}

export default Login
