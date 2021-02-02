import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSelectedImage } from './features/appSlice'
import "./PostView.css"

function PostView() {
    const selectedImage = useSelector(selectSelectedImage);
    const history = useHistory();

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage])

    const exit = () => {
        history.replace("/posts");
    }

    return (
        <div className='postView'>
            <img src={selectedImage} alt="" onClick={exit} />
        </div>
    )
}

export default PostView
