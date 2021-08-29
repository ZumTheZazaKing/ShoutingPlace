import { firestore } from "./Auth";
import { Shout } from "./Shout";

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useState } from 'react';

export function Home(props){

    const [type, setType] = useState("createdAt")

    const shoutsRef = firestore.collection("shouts");
    const query = shoutsRef.orderBy(type, "desc");

    const [shouts] = useCollectionData(query, {idField:'id'});

    function openViewProfile(){
        props.openViewProfile();
        props.closeProfile();
        props.closeHomePage();
    }

    return (<div id="homepage" className="hide" ref={props.homePageRef}>
        <div id="header">
            <h2>Latest Shouts</h2>
            <select onChange={e => setType(e.target.value)} value={type}>
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