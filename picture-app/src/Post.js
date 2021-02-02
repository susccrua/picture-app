import { Avatar } from '@material-ui/core'
import React from 'react'
import './Post.css'
import ReactTimeago from "react-timeago";
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import VisibilityIcon from '@material-ui/icons/Visibility';


function Post({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const open = () => {
        dispatch(selectImage(imageUrl));
        db.collection('posts').doc(id).set({
            read: true,
        }, {
            merge: true
        });

        history.push('/posts/view');
    }

    return (
        <div className='post' onClick={open}>
            <Avatar className='post__avatar' src={profilePic} />
            <div className='post__info'>
                <h4>{username}</h4>
                <p>Posted <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>
            <VisibilityIcon className={read ? 'post__seen' : 'post__unseen'} />
        </div>
    )
}

export default Post
