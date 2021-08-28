import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';

import { firestore } from './Auth';
import { Shout } from './Shout';

import { useCollectionData } from 'react-firebase-hooks/firestore';

export function ViewProfile(props){

    const shoutsRef = firestore.collection("shouts");
    const query = shoutsRef.where("uid","==",props.viewUid).orderBy("createdAt","desc");

    const [viewShouts] = useCollectionData(query, {idField:'id'});

    function openViewProfile(){
        props.openViewProfile();
        props.closeProfile();
        props.closeHomePage();
    }

    return (<div id="ViewProfile" className="hide" ref={props.viewProfileRef}>
        <div id="dashboardContent">
            <img id="profilePicture" src={props.viewImage} alt="Loading..."/>
            <h2>{props.viewUsername}</h2>
            <p id="bio">{props.viewBio}</p>
            {props.viewWebsite ? <p><a id="link" href={props.viewWebsite}><LinkIcon className="icon"/>{props.viewWebsite}</a></p> : ""}
            {props.viewEmail ? <p><EmailIcon className="icon"/>{props.viewEmail}</p> : ""}
            <p><EventIcon className="icon"/>Joined {props.viewJoined}</p>
        </div>
        <br/>
        <div id="userShouts">
            <h2>{props.viewUsername}'s Shouts</h2>
            <hr/>
            {viewShouts && viewShouts.map(viewShout => <Shout imageClick={openViewProfile} setViewUid={props.setViewUid} setViews={props.setViewVariables} shoutData={viewShout}/>)}
        </div>
    </div>)
}