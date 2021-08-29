import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import { auth, firestore, storage } from './Auth';
import firebase from './firebase';

export function CreateShout(props){

    const shoutsRef = firestore.collection("shouts");

    const [shout, setShout] = useState("");
    const [image, setImage] = useState("");
    const [imagePath, setImagePath] = useState("");

    const createShout = () => {
        if(!shout)return;

        let createTimestamp = new Date().toLocaleString();

        if(image){
            storage.ref(`${auth.currentUser.uid}PostImages/${image.name}`).put(image);
    
            setTimeout(() => {
                storage.ref().child(`${auth.currentUser.uid}PostImages/${image.name}`).getDownloadURL().then(res => {
                    shoutsRef.add({
                        uid:auth.currentUser.uid,
                        userHandle:props.username,
                        likeCount:0,
                        commentCount:0,
                        userImage:props.photoURL,
                        body:shout,
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        createTimestamp: createTimestamp,
                        likeList:[],
                        bodyImage:res
                    })
                })
            },4000)
            setShout("");
            setImage("");
            props.closeCreateShout();
            return;
        }

        shoutsRef.add({
            uid:auth.currentUser.uid,
            userHandle:props.username,
            likeCount:0,
            commentCount:0,
            userImage:props.photoURL,
            body:shout,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            createTimestamp: createTimestamp,
            likeList:[],
            bodyImage:imagePath
        })

        setShout("");
        props.closeCreateShout();
    }

    return (<div id="createShout" className="hide" ref={props.createShoutRef}>
        <div id="createForm">
            <span id="close" onClick={() => props.closeCreateShout()}>&times;</span>
            <h4>Create Shout</h4>
            <TextField 
            multiline={true} 
            rows="5" 
            fullWidth={true} 
            color="primary" 
            inputProps={{maxLength:280}}
            required
            value={shout}
            onChange={e => setShout(e.target.value)}
            />
            <br/><br/>
            <div id="shoutButton">
                <input type="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{setImage(e.target.files[0])}}/>
                <Button variant="contained" color="secondary" onClick={() => createShout()}>SHOUT!</Button>
            </div>
        </div>
    </div>)
}