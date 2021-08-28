import { firestore, auth } from './Auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Notification } from './Notification';


export function Notifications(props){

    const notiRef = firestore.collection("notifications");
    let query = auth.currentUser ? notiRef.where("notiFor","==",auth.currentUser.uid).orderBy("createdAt","desc").limit(50) : notiRef;

    let [notifications] = useCollectionData(query, {idField:'id'});

    return <div id="Notifications" className="hide" ref={props.notiRef}>
        <h2>Notifications</h2>
        <div id="notis">
            {notifications && notifications.map(notification => <Notification key={notification.id} notiData={notification}/>)}
        </div>
    </div>
}