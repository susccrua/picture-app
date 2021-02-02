import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './Preview';
import Posts from './Posts';
import PostView from './PostView'
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice'
import { auth } from './firebase';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      } else {
        dispatch(logout());
      }
    })
  })

  return (
    <div className="app">

      <Router>
        {!user ?
          <Login />
          :
          <div className='app__body'>
            <Switch>
              <Route path="/posts/view">
                <PostView />
              </Route>
              <Route path="/posts">
                <Posts />
              </Route>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
            </Switch>
          </div>
        }
      </Router>
    </div >
  );
}

export default App;
