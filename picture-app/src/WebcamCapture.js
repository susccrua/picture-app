import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import CameraIcon from '@material-ui/icons/Camera';
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import './WebcamCapture.css'
import CloseIcon from '@material-ui/icons/Close'

const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"

};

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    //retrieves history of the webpage, and we can push a page onto it.
    const history = useHistory();

    //uses the function once and saves the output of the function, so that it doesn't have to compile again when it is called in the future. It re-runs when the dependency changes.
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc)); //push image to store
        //redirect user to next screen
        history.push('/preview');

    }, [webcamRef]
    )

    const close = () => {
        history.push('/posts');
    }

    return (
        <div className='webcamCapture'>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <CameraIcon
                className='webcamCapture__button'
                onClick={capture}
                fontSize="large"
            />
            <CloseIcon
                className='webcamCapture__close'
                onClick={close} />

        </div>
    )
}

export default WebcamCapture
