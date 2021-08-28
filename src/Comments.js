import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import { useState } from 'react';
import { auth, firestore } from './Auth';
import firebase from './firebase';
import { Comment } from './Comment';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export function Comments(props){

    const [commentBody, setCommentBody] = useState("");
    const handleChange = e => setCommentBody(e.target.value);

    const commentsRef = firestore.collection("comments");
    const usersRef = firestore.collection("users");
    const shoutsRef = firestore.collection("shouts");
    const notiRef = firestore.collection("notifications");

    const query = commentsRef.where("commentFor","==",props.id).orderBy("createdAt");

    const [shoutComments] = useCollectionData(query, {idField:'id'});

    const createComment = () => {

        if(!commentBody)return;

        let commentTimestamp = new Date().toLocaleString();

        usersRef.doc(auth.currentUser.uid).get().then(doc => {
            commentsRef.add({
                commentFor:props.id,
                commentHandle:doc.data().username,
                commentImage:doc.data().photoURL,
                commentBody:commentBody,
                commentTimestamp:commentTimestamp,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                uid:auth.currentUser.uid
            })
        })

        shoutsRef.doc(props.id).get().then(doc => {
            shoutsRef.doc(props.id).update({commentCount: doc.data().commentCount + 1})
        })

        setCommentBody("");

        if(auth.currentUser.uid === props.uid)return;

        usersRef.doc(auth.currentUser.uid).get().then(doc => {
            notiRef.add({
                notiUid:auth.currentUser.uid,
                notiHandle:doc.data().username,
                notiImage:doc.data().photoURL,
                notiPost:props.id,
                notiFor:props.uid,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                notiMessage:"commented on your shout",
                notiTimestamp:commentTimestamp
            })
            usersRef.doc(props.uid).update({
                notiCount:doc.data().notiCount + 1
            })
        })


    }

    return (<div id="Comments" ref={props.commentsRef} className="hide">
        <div id="commentsContent">
            <span id="close" onClick={() => props.closeComments()}>&times;</span>
            <br/>
            <div id="commentInput">
                <InputLabel>Comment!</InputLabel>
                <TextField 
                    multiline={true} 
                    rows="2" 
                    fullWidth={true} 
                    color="primary" 
                    value={commentBody}
                    onChange={e => handleChange(e)}
                    inputProps={{maxLength:200}}
                    required
                />
            </div>
            <br/>
            <Button variant="contained" color="primary" onClick={() => createComment()}>
                <SendIcon/>
            </Button>
            <br/><br/>
            <hr/>
            <div id="commentsSection">
                {shoutComments && shoutComments.map(comment => <Comment imageClick={props.imageClick} setViews={props.setViews} setViewUid={props.setViewUid} key={comment.id} commentData={comment}/>)}
            </div>
        </div>
    </div>)
}