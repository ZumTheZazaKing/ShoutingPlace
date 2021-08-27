import './App.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { SignIn, auth, firestore } from './Auth';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { Navbar } from './Navbar';

import { useRef } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  const usersRef = firestore.collection("users");

  const homePageRef = useRef();
  const closeHomePage = () => homePageRef.current.className = "hide";
  const openHomePage = () => homePageRef.current.className = "";

  const profileRef = useRef();
  const closeProfile = () => profileRef.current.className = "hide";
  const openProfile = () => profileRef.current.className = "";

  return (
    <div className="App">
      <Navbar closeHomePage={closeHomePage} openHomePage={openHomePage} closeProfile={closeProfile} openProfile={openProfile}/>
      {user ? <Dashboard usersRef={usersRef} profileRef={profileRef}/> : <SignIn/>}
      <Home homePageRef={homePageRef}/>
    </div>
  );
}

export default App;
