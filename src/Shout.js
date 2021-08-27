import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';

import { auth, firestore } from './Auth';
import { ShoutAlert } from './ShoutAlert';
import { useRef } from 'react'; 

export function Shout(props){

    const { uid, userHandle, userImage, likeCount, createTimestamp, body, id, likeList } = props.shoutData;
    const shoutsRef = firestore.collection("shouts");

    const shoutAlertRef = useRef();
    const openShoutAlertRef = () => {
        shoutAlertRef.current.className = "";
    }
    const closeShoutAlertRef = () => {
        shoutAlertRef.current.className = "hide";
    }
    function deleteShout(){
        shoutsRef.doc(id).delete();
    }


    function ToggleLike(){
        shoutsRef.doc(id).get().then(doc => {
            if(doc.data().likeList.includes(auth.currentUser.uid)){
                return;
            } else {
                shoutsRef.doc(id).update({
                    likeList:[...likeList, auth.currentUser.uid],
                    likeCount:likeCount+1,
                })
            }
        })
    }


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
            <p>{auth.currentUser.uid === uid ? <DeleteIcon onClick={() => openShoutAlertRef()} className="deleteShout"/> : ""}</p>
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
        </div>
        <ShoutAlert
        closeShoutAlertRef={closeShoutAlertRef}
        deleteShout={deleteShout}
        shoutAlertRef={shoutAlertRef}
        />
    </div>)
}