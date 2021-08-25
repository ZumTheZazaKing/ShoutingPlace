import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { useState } from 'react';

import { storage, auth, firestore } from './Auth';

export function EditProfile(props){

    const [image, setImage] = useState('');
    const docRef = firestore.collection("users").doc(auth.currentUser.uid);

    const update = () => {
        props.closeEditProfile();

        docRef.update({
            username:props.username,
            bio:props.bio,
            website:props.website,
            location:props.location
        })


        if(!image)return; //Below this point is for updating the image
    
        storage.ref(`PPImages/${image.name}`).put(image);
    
        setTimeout(() => {
            storage.ref().child(`PPImages/${image.name}`).getDownloadURL().then(res => {
                docRef.update({photoURL:res});
                props.setPhotoURL(res);
            })
        },4000);

    }

    return (<div id="editProfile" className="hide" ref={props.editProfileRef}>
       <div id="editForm">
            <div id="fillIn">
                <InputLabel>Profile Picture</InputLabel><br/>
                <input type="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{setImage(e.target.files[0])}}/>
                <br/><br/>
                <InputLabel>Username</InputLabel>
                <Input fullWidth={true} color="primary" value={props.username} onChange={e => props.setUsername(e.target.value)} required/><br/><br/>
                <InputLabel>Bio</InputLabel>
                <Input multiline={true} maxRows="3" fullWidth={true} color="primary" value={props.bio} onChange={e => props.setBio(e.target.value)} required/><br/><br/>
                <InputLabel>Website</InputLabel>
                <Input fullWidth={true} color="primary" value={props.website} onChange={e => props.setWebsite(e.target.value)} required/><br/><br/>
                <InputLabel>Location</InputLabel>
                <Input fullWidth={true} color="primary" value={props.location} onChange={e => props.setLocation(e.target.value)} required/>
                <br/><br/>
            </div>
            <Button id="submit" color="primary" variant="contained" onClick={() => update()}>SUBMIT</Button>
       </div>
    </div>)
}