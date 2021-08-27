import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import { auth, firestore } from './Auth';
import firebase from './firebase';

export function CreateShout(props){

    const shoutsRef = firestore.collection("shouts");

    const [shout, setShout] = useState("");

    const createShout = () => {
        if(!shout)return;

        let createTimestamp = new Date().toLocaleString();

        shoutsRef.add({
            uid:auth.currentUser.uid,
            userHandle:props.username,
            likeCount:0,
            userImage:props.photoURL,
            body:shout,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            createTimestamp: createTimestamp,
            likeList:[],
            commentList:[]
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
                <Button variant="contained" color="secondary" onClick={() => createShout()}>SHOUT!</Button>
            </div>
        </div>
    </div>)
}