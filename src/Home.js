import { firestore } from "./Auth";
import { Shout } from "./Shout";

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useState } from 'react';

export function Home(props){

    const [type, setType] = useState("createdAt");
    const [typeMsg, setTypeMsg] = useState("Latest Shouts");

    const shoutsRef = firestore.collection("shouts");
    const query = shoutsRef.orderBy(type, "desc");

    const [shouts] = useCollectionData(query, {idField:'id'});

    function openViewProfile(){
        props.openViewProfile();
        props.closeProfile();
        props.closeHomePage();
    }

    function changeType(e){
        setType(e.target.value);
        if(e.target.value === 'createdAt'){
            setTypeMsg("Latest Shouts");
        } else if (e.target.value === 'likeCount'){
            setTypeMsg("Most Likes");
        } else {
            setTypeMsg("Most Comments");
        }
    }

    return (<div id="homepage" className="hide" ref={props.homePageRef}>
        <div id="header">
            <h2>{typeMsg}</h2>
            <select onChange={e => changeType(e)} value={type}>
                <option value="createdAt">Lastest</option>
                <option value="likeCount">Most Likes</option>
                <option value="commentCount">Most Comments</option>
            </select>
        </div>
        <div id="shouts">
            {shouts && shouts.map(shout => <Shout imageClick={openViewProfile} setViewUid={props.setViewUid} setViews={props.setViewVariables} key={shout.id} shoutData={shout}/>)}
        </div>
    </div>)
}