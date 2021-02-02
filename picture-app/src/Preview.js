import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import "./Preview.css"
import CloseIcon from '@material-ui/icons/Close'
import PublishIcon from '@material-ui/icons/Publish'
import { v4 as uuid } from "uuid";
import { db, storage } from './firebase'
import firebase from 'firebase';
import { selectUser } from './features/appSlice'

function Preview() {
    //useSelector pulls values from the store
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        //if there is no camera image redirect to homepage
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
    }

    const sendPost = () => {
        //following prevents collisions
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, "data_url");

        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                // Error function
                console.log(error);
            },
            () => {
                //Complete function
                storage
                    .ref('posts')
                    .child(id)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                            imageUrl: url,
                            username: user.username,
                            read: false,
                            profilePic: user.profilePic,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        history.replace("/posts");
                    })
            }
        );
    };

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className='preview__close' />

            <PublishIcon onClick={sendPost} className='preview__publishIcon' />

            <img src={cameraImage} alt="" />
        </div>
    )
}

export default Preview
