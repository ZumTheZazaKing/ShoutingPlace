import { SignOut, auth, firestore } from "./Auth";
import { EditProfile } from './EditProfile';
import { CreateShout } from './CreateShout';

import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { useState, useEffect, useRef } from 'react';
import { Shout } from './Shout';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export function Dashboard(props){

    const shoutsRef = firestore.collection("shouts");
    const query = shoutsRef.where("uid","==",auth.currentUser.uid).orderBy("createdAt", "desc");

    const [userShouts] = useCollectionData(query, {idField:'id'});

    const [username, setUsername] = useState(auth.currentUser.displayName);
    const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL);
    const [bio, setBio] = useState("The user is lazy and didn't set a bio...");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [joinDate, setJoinDate] = useState("Loading...");

    const editProfileRef = useRef();
    const closeEditProfile = () => {editProfileRef.current.className = "hide";}
    const openEditProfile = () => {editProfileRef.current.className = "";}

    const createShoutRef = useRef();
    const openCreateShout = () => {createShoutRef.current.className = ""}
    const closeCreateShout = () => {createShoutRef.current.className = "hide"}

    function openViewProfile(){
        props.openViewProfile();
        props.closeProfile();
        props.closeHomePage();
    }

    function setValues(data){
        setUsername(data.username);
        setPhotoURL(data.photoURL);
        setBio(data.bio);
        setWebsite(data.website);
        setEmail(data.email);
        setJoinDate(data.joinDate);
    }

    const docRef = props.usersRef.doc(auth.currentUser.uid);
    
    useEffect(() => {
        docRef.get().then(doc => {
            if(doc.exists){
                docRef.get().then(data => setValues(data.data()))
            } else {
                docRef.set({
                    username:auth.currentUser.displayName,
                    photoURL:auth.currentUser.photoURL,
                    bio:bio,
                    website:website,
                    email:email,
                    joinDate:new Date().toLocaleDateString(),
                    notiCount:0
                });
                docRef.get().then(data => setValues(data.data()))
            }
        })
    },[])

    return (<div id="dashboard" ref={props.profileRef}>
        <div id="dashboardContent">
            <img id="profilePicture" src={photoURL} alt="profile phot should be here"/>
            <button id="editButton" onClick={() => openEditProfile()}>EDIT</button>
            <h2>{username}</h2>
            <p id="bio">{bio}</p>
            {website ? <p><a id="link" href={website}><LinkIcon className="icon"/>{website}</a></p> : ""}
            {email ? <p><EmailIcon className="icon"/>{email}</p> : ""}
            <p><EventIcon className="icon"/>Joined {joinDate}</p>
            <br/>
            <SignOut/>
        </div>
        <br/>
        <Tooltip title="Create Shout">
            <Button id="addShout" variant="contained" color="primary" onClick={() => openCreateShout()}>+</Button>
        </Tooltip>
        <br/><br/>
        <div id="userShouts">
            <h2>Your Shouts</h2>
            <hr/>
            {userShouts && userShouts.map(shout => <Shout imageClick={openViewProfile} setViewUid={props.setViewUid} setViews={props.setViewVariables} key={shout.id} shoutData={shout}/>)}
        </div>
        <EditProfile
        photoURL={photoURL}
        username={username}
        bio={bio}
        website={website}
        email={email}
        setPhotoURL={setPhotoURL}
        setUsername={setUsername}
        setBio={setBio}
        setWebsite={setWebsite}
        setEmail={setEmail}
        editProfileRef={editProfileRef}
        closeEditProfile={closeEditProfile}
        />
        <CreateShout
        createShoutRef={createShoutRef}
        closeCreateShout={closeCreateShout}
        username={username}
        photoURL={photoURL}
        />
    </div>)
}