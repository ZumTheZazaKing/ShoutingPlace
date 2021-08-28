import { auth, firestore } from './Auth';

export function Comment(props){

    const { commentBody, commentHandle, commentImage, commentTimestamp, id, uid} = props.commentData;

    const usersRef = firestore.collection("users");

    function viewProfile(){
        props.imageClick();
        usersRef.doc(uid).get().then(doc => {
            props.setViews(doc.data())
        })
        props.setViewUid(uid);
    }

    return (<div className="comment" id={id} name={uid}>
        <div id="commentHeader">
            <img onClick={auth.currentUser === null ? () => {return} : (auth.currentUser.uid !== uid ? () => viewProfile() : () => {return})} src={commentImage} alt="PP here"/>
            <p><span>{commentHandle}</span><br/>{commentTimestamp}</p>
        </div>
        <div id="commentBody">
            {commentBody}
        </div>
    </div>)
}