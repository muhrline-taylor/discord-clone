import React, { useEffect } from 'react';
import './static/css/App.css';
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './components/Login';
import { auth } from './firebase';
import { login, logout } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("*****")
      console.log(`user is ${authUser}`)
      if(authUser){
        // user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // user is logged out
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div className="app">
      {
        user ? (
          <>
            <Sidebar />
            <Chat />
          </>
        ): (
          <Login />
        )
      }
      
      

    </div>
  );
}

export default App;
