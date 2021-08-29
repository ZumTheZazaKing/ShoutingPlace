import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';
import Collapse from '@material-ui/core/Collapse';

import firebase from './firebase';
import { auth, firestore } from './Auth';
import { ShoutAlert } from './ShoutAlert';
import { Comments } from './Comments';

import { useRef, useState } from 'react'; 

export function Shout(props){

    const { uid, userHandle, userImage, likeCount, createTimestamp, body, id, likeList, commentCount, bodyImage } = props.shoutData;
    const shoutsRef = firestore.collection("shouts");
    const commentsReference = firestore.collection("comments");
    const usersRef = firestore.collection("users");
    const notiRef = firestore.collection("notifications");

    const [isChecked, setIsChecked] = useState(false);

    const commentsRef = useRef();
    const openComments = () => commentsRef.current.className = "";
    const closeComments = () => commentsRef.current.className = "hide";

    const shoutAlertRef = useRef();
    const openShoutAlertRef = () => {shoutAlertRef.current.className = "";}
    const closeShoutAlertRef = () => {shoutAlertRef.current.className = "hide";}
    function deleteShout(){
        shoutsRef.doc(id).delete();
        commentsReference.get().then(docs => {
            docs.forEach(doc => {
                if(doc.data().commentFor === id){
                    doc.ref.delete();
                }
            })
        })
    }


    function ToggleLike(){
        shoutsRef.doc(id).get().then(doc => {
            if(doc.data().likeList.includes(auth.currentUser.uid)){
                shoutsRef.doc(id).update({
                    likeCount: likeCount - 1,
                    likeList: likeList.slice(0, likeList.length - 1)
                })

                if(auth.currentUser.uid === uid)return;
                notiRef.get().then(docs => {
                    docs.forEach(data => {
                        if(data.data().notiUid === auth.currentUser.uid){
                            if(data.data().notiPost === id){
                                data.ref.delete();
                            }
                        }
                    })
                })
                usersRef.doc(uid).get().then(uidDoc => {
                    usersRef.doc(uid).update({
                        notiCount:uidDoc.data().notiCount - 1
                    })
                })

            } else {
                shoutsRef.doc(id).update({
                    likeList:[...likeList, auth.currentUser.uid],
                    likeCount:likeCount+1,
                })

                if(auth.currentUser.uid === uid)return;
                const shoutTimestamp = new Date().toLocaleString();

                usersRef.doc(auth.currentUser.uid).get().then(data => {
                    notiRef.add({
                        notiUid:auth.currentUser.uid,
                        notiHandle:data.data().username,
                        notiImage:data.data().photoURL,
                        notiPost:id,
                        notiFor:uid,
                        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                        notiMessage:"liked your shout",
                        notiTimestamp:shoutTimestamp,
                        notiPostImage:bodyImage
                    })
                    usersRef.doc(uid).get().then(uidDoc => {
                        usersRef.doc(uid).update({
                            notiCount:uidDoc.data().notiCount + 1
                        })
                    })
                })
            }
        })
    }

    function viewProfile(){
        props.imageClick();
        usersRef.doc(uid).get().then(doc => {
            props.setViews(doc.data())
        })
        props.setViewUid(uid);
    }

    return (<div className="shout" id={id} name={uid}>
        <div id="shoutHeader">
            <div id="shoutHeaderMain">
                <img src={userImage} alt="PP here" onClick={auth.currentUser === null ? () => {return} : (auth.currentUser.uid !== uid ? () => viewProfile() : () => {return})}/>
                <div id="shoutInfo">
                    <p>
                        {userHandle}<br/>
                        <span>{createTimestamp}</span>
                    </p>
                </div>
            </div>
            <p>{auth.currentUser === null ? "" : (auth.currentUser.uid === uid ? <DeleteIcon onClick={() => openShoutAlertRef()} className="deleteShout"/> : "")}</p>
        </div>
        <br/>
        <div id="shoutBody">
            <p>{body}</p>
            <br/>
            {bodyImage ? 
            <Collapse in={isChecked} collapsedSize="100px">
                <img src={bodyImage} onClick={isChecked ? () => setIsChecked(false) : () => setIsChecked(true)} alt="Post img here"/>
            </Collapse>
            : ""}
        </div>
        <div id="shoutFooter">
            <Tooltip title="Likes">
                <p id="likes" onClick={() => ToggleLike()}>
                    <FavoriteIcon/>
                    {likeCount}
                </p>
            </Tooltip>
            <Tooltip title="Comments">
                <p id="comments" onClick={() => openComments()}>
                    <ChatIcon/>
                    {commentCount}
                </p>
            </Tooltip>
        </div>
        <ShoutAlert
        closeShoutAlertRef={closeShoutAlertRef}
        deleteShout={deleteShout}
        shoutAlertRef={shoutAlertRef}
        />
        <Comments
        commentsRef={commentsRef}
        closeComments={closeComments}
        id={id}
        uid={uid}
        imageClick={props.imageClick}
        setViews={props.setViews}
        setViewUid={props.setViewUid}
        bodyImage={bodyImage}
        />
    </div>)
}