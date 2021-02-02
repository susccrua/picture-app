import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase';
import './Posts.css'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Posts() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const history = useHistory();
    const dispatch = useDispatch();

    const addPost = () => {
        dispatch(resetCameraImage());
        history.push('/');
    }

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>
                setPosts(
                    snapshot
                        .docs
                        .map(doc => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                )
            );
    }, []);

    return (
        <div className='posts'>
            <div className='posts__header'>

                <div className="posts__search">
                    <SearchIcon />
                    <input placeholder="Search" type="text" />
                </div>
                <AddIcon className='posts__add' onClick={addPost} />
                <Avatar
                    src={user.profilePic}
                    onClick={() => auth.signOut()} className='posts__avatar' />
            </div>

            <div className='posts__feed'>
                {posts.map(
                    ({ id, data: { profilePic, username, timestamp, imageUrl, read }, }) => (
                        <Post
                            key={id}
                            id={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            read={read}
                            profilePic={profilePic}
                        />

                    ))}
            </div>

        </div>
    )
}

export default Posts
