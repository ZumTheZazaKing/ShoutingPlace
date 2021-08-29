import { firestore, auth } from './Auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Notification } from './Notification';
import { NotificationPost } from './NotificationPost';
import { useRef, useState } from 'react';


export function Notifications(props){

    const notiPostRef = useRef()
    const openNotiPost = () => notiPostRef.current.className = "";
    const closeNotiPost = () => notiPostRef.current.className = "hide";

    const [notiPostName, setNotiPostName] = useState("");
    const [notiPostImage, setNotiPostImage] = useState("");
    const [notiPostTime, setNotiPostTime] = useState("");
    const [notiPostBody, setNotiPostBody] = useState("");

    const [notiPostHandle, setNotiPostHandle] = useState("");
    const [notiPostMessage, setNotiMessage] = useState("");
    const [notiPostHandleImage, setNotiPostHandleImage] = useState("");

    const notiRef = firestore.collection("notifications");
    let query = auth.currentUser ? notiRef.where("notiFor","==",auth.currentUser.uid).orderBy("createdAt","desc").limit(50) : notiRef;

    let [notifications] = useCollectionData(query, {idField:'id'});

    return <div id="Notifications" className="hide" ref={props.notiRef}>
        <h2>Notifications</h2>
        <div id="notis">
            {notifications && notifications.map(notification => <Notification 
            openNotiPost={openNotiPost}
            setNotiPostName={setNotiPostName}
            setNotiPostImage={setNotiPostImage}
            setNotiPostBody={setNotiPostBody} 
            setNotiPostTime={setNotiPostTime}
            setNotiPostHandle={setNotiPostHandle}
            setNotiMessage={setNotiMessage}
            setNotiPostHandleImage={setNotiPostHandleImage}
            key={notification.id} 
            notiData={notification}/>)}
        </div>

        <NotificationPost 
        closeNotiPost={closeNotiPost} 
        notiPostRef={notiPostRef}
        notiPostName={notiPostName}
        notiPostImage={notiPostImage}
        notiPostTime={notiPostTime}
        notiPostBody={notiPostBody}
        notiPostHandle={notiPostHandle}
        notiPostMessage={notiPostMessage}
        notiPostHandleImage={notiPostHandleImage}
        />
    </div>
}