import { SignOut, auth } from "./Auth";
import { EditProfile } from './EditProfile';

import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';

import { useState, useEffect, useRef } from 'react';

export function Dashboard(props){

    const [username, setUsername] = useState(auth.currentUser.displayName);
    const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL);
    const [bio, setBio] = useState("This is where the bio is supposed to be but the the user is lazy...");
    const [website, setWebsite] = useState("Not set");
    const [email, setEmail] = useState("Not set");
    const [joinDate, setJoinDate] = useState("Loading...");

    const editProfileRef = useRef();
    const closeEditProfile = () => {
        editProfileRef.current.className = "hide";
    }
    const openEditProfile = () => {
        editProfileRef.current.className = "";
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
                    joinDate:new Date().toLocaleDateString()
                });
                docRef.get().then(data => setValues(data.data()))
            }
        })
    },[])

    return (<div id="dashboard">
        <div id="dashboardContent">
            <img id="profilePicture" src={photoURL} alt="profile phot should be here"/>
            <button id="editButton" onClick={() => openEditProfile()}>EDIT</button>
            <h2>{username}</h2>
            <p id="bio">{bio}</p>
            <p><a id="link" href={website}><LinkIcon className="icon"/>{website}</a></p>
            <p><EmailIcon className="icon"/>{email}</p>
            <p><EventIcon className="icon"/>Joined {joinDate}</p>
            <br/>
            <SignOut/>
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
    </div>)
}