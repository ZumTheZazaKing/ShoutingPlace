import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';

import { auth, firestore } from './Auth';
import { ShoutAlert } from './ShoutAlert';
import { Comments } from './Comments';

import { useRef } from 'react'; 

import { useAuthState } from 'react-firebase-hooks/auth';

export function Shout(props){

    const { uid, userHandle, userImage, likeCount, createTimestamp, body, id, likeList, commentCount } = props.shoutData;
    const shoutsRef = firestore.collection("shouts");

    const commentsRef = useRef();
    const openComments = () => commentsRef.current.className = "";
    const closeComments = () => commentsRef.current.className = "hide";

    const shoutAlertRef = useRef();
    const openShoutAlertRef = () => {shoutAlertRef.current.className = "";}
    const closeShoutAlertRef = () => {shoutAlertRef.current.className = "hide";}
    function deleteShout(){shoutsRef.doc(id).delete();}


    function ToggleLike(){
        shoutsRef.doc(id).get().then(doc => {
            if(doc.data().likeList.includes(auth.currentUser.uid)){
                shoutsRef.doc(id).update({
                    likeCount: likeCount - 1,
                    likeList: likeList.slice(0, likeList.length - 1)
                })
            } else {
                shoutsRef.doc(id).update({
                    likeList:[...likeList, auth.currentUser.uid],
                    likeCount:likeCount+1,
                })
            }
        })
    }

    const [user] = useAuthState(auth);

    return (<div className="shout" id={id} name={uid}>
        <div id="shoutHeader">
            <div id="shoutHeaderMain">
                <img src={userImage} alt="PP here"/>
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
        />
    </div>)
}