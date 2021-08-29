import Button from '@material-ui/core/Button';

import { firestore } from './Auth';

export function CommentAlert(props){

    const commentRef = firestore.collection("comments");
    const shoutRef = firestore.collection("shouts");


    function deleteComment(){
        props.closeCommentAlert();
        commentRef.doc(props.id).delete();
        shoutRef.doc(props.commentFor).get().then(doc => {
            shoutRef.doc(props.commentFor).update({commentCount:doc.data().commentCount - 1});
        })
    }

    return (<div id="CommentAlert" className="hide" ref={props.commentAlertRef}>
        <div id="commentAlertContent">
            <p>Delete the comment?</p>
            <Button onClick={() => props.closeCommentAlert()}>NO</Button>
            <Button onClick={() => deleteComment()} variant="contained" color="secondary">YES</Button>
        </div>
    </div>)
}