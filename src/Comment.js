import { auth, firestore } from './Auth';
import DeleteIcon from '@material-ui/icons/Delete';
import { CommentAlert } from './CommentAlert';

import { useRef } from 'react';

export function Comment(props){

    const { commentBody, commentHandle, commentImage, commentTimestamp, id, uid, commentFor} = props.commentData;

    const usersRef = firestore.collection("users");

    function viewProfile(){
        props.imageClick();
        usersRef.doc(uid).get().then(doc => {
            props.setViews(doc.data())
        })
        props.setViewUid(uid);
    }

    function openAlert(){
        openCommentAlert();
    }

    const commentAlertRef = useRef();
    const closeCommentAlert = () => commentAlertRef.current.className = "hide";
    const openCommentAlert = () => commentAlertRef.current.className = "";

    return (<div className="comment" id={id} name={uid}>
        <div id="commentHeader">
            <div id="commentInfo">
                <img onClick={auth.currentUser === null ? () => {return} : (auth.currentUser.uid !== uid ? () => viewProfile() : () => {return})} src={commentImage} alt="PP here"/>
                <p><span>{commentHandle}</span><br/>{commentTimestamp}</p>
            </div>
            <div id="deleteContainer">
                {auth.currentUser === null ? "" : (auth.currentUser.uid === uid ? <DeleteIcon id="delete" onClick={() => openAlert()}/> : "")}
            </div>
        </div>
        <div id="commentBody">
            {commentBody}
        </div>
        <CommentAlert commentAlertRef={commentAlertRef} id={id} commentFor={commentFor} closeCommentAlert={closeCommentAlert}/>
    </div>)
}