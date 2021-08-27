import { firestore } from "./Auth";
import { Shout } from "./Shout";

import { useCollectionData } from 'react-firebase-hooks/firestore';

export function Home(props){

    const shoutsRef = firestore.collection("shouts");
    const query = shoutsRef.orderBy("createdAt", "desc");

    const [shouts] = useCollectionData(query, {idField:'id'});

    return (<div id="homepage" className="hide" ref={props.homePageRef}>
        <h2>Latest Shouts</h2>
        <div id="shouts">
            {shouts && shouts.map(shout => <Shout key={shout.id} shoutData={shout}/>)}
        </div>
    </div>)
}