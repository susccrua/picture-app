import React from 'react'
import { useDispatch } from 'react-redux'
import './Login.css'
import camera from './camera.png'
import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import { login } from './features/appSlice'

function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch(
                login({
                    username: result.user.displayName,
                    profilePic: result.user.photoURL,
                    id: result.user.uid,
                })
            );
        }).catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className='login__container'>
                <img src={camera} alt="cameralogo" />
                <Button variant='outline' onClick={signIn} className='login__button'>Sign in</Button>
            </div>
        </div>
    )
}

export default Login;
