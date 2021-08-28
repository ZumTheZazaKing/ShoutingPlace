import './App.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { SignIn, auth, firestore } from './Auth';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { Navbar } from './Navbar';
import { ViewProfile } from './ViewProfile';
import { Notifications } from './Notifications';

import { useRef, useState } from 'react';

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

  const viewProfileRef = useRef();
  const closeViewProfile = () => viewProfileRef.current.className = "hide";
  const openViewProfile = () => viewProfileRef.current.className = "";

  const notiRef = useRef();
  const closeNoti = () => notiRef.current.className = "hide";
  const openNoti = () => notiRef.current.className = "";


  let [viewUsername, setViewUsername] = useState("Loading...");
  let [viewImage, setViewImage] = useState("");
  let [viewBio, setViewBio] = useState("Loading...");
  let [viewWebsite, setViewWebsite] = useState("Loading...");
  let [viewEmail, setViewEmail] = useState("Loading...");
  let [viewJoined, setViewJoined] = useState("Loading...");
  let [viewUid, setViewUid] = useState("");

  function setViewVariables(data){
    setViewUsername(data.username);
    setViewImage(data.photoURL);
    setViewBio(data.bio);
    setViewWebsite(data.website);
    setViewEmail(data.email);
    setViewJoined(data.joinDate);
  }

  return (
    <div className="App">
      <Navbar 
      closeHomePage={closeHomePage} 
      openHomePage={openHomePage} 
      closeProfile={closeProfile} 
      openProfile={openProfile}
      closeViewProfile={closeViewProfile}
      openNoti={openNoti}
      closeNoti={closeNoti}
      />

      {user ? <Dashboard 
      openViewProfile={openViewProfile} 
      usersRef={usersRef} 
      profileRef={profileRef}
      closeHomePage={closeHomePage}
      closeProfile={closeProfile}
      setViewVariables={setViewVariables}
      setViewUid={setViewUid}
      /> 
      : <SignIn/>}

      <Home homePageRef={homePageRef} 
      openViewProfile={openViewProfile} 
      closeProfile={closeProfile}
      closeHomePage={closeHomePage}
      setViewVariables={setViewVariables}
      setViewUid={setViewUid}
      />

      <ViewProfile 
      viewProfileRef={viewProfileRef} 
      openViewProfile={openViewProfile}
      closeProfile={closeProfile}
      closeHomePage={closeHomePage}
      viewUsername={viewUsername}
      viewImage={viewImage}
      viewBio={viewBio}
      viewWebsite={viewWebsite}
      viewEmail={viewEmail}
      viewJoined={viewJoined}
      viewUid={viewUid}
      setViewUid={setViewUid}
      setViewVariables={setViewVariables}
      />

      <Notifications notiRef={notiRef}/>
    </div>
  );
}

export default App;
