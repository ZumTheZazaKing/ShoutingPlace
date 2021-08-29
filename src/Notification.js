import { firestore } from './Auth';


export function Notification(props){

    const { notiHandle, notiImage, notiMessage, notiTimestamp, notiPost} = props.notiData;

    const shoutsRef = firestore.collection("shouts");

    function setNotiPost(){
        props.openNotiPost();

        shoutsRef.doc(notiPost).get().then(doc => {
            props.setNotiPostName(doc.data().userHandle);
            props.setNotiPostImage(doc.data().userImage);
            props.setNotiPostTime(doc.data().createTimestamp);
            props.setNotiPostBody(doc.data().body);

            props.setNotiPostHandle(notiHandle);
            props.setNotiMessage(notiMessage);
            props.setNotiPostHandleImage(notiImage);
        })
    }


    return (<div className="notification" onClick={() => setNotiPost()}>
        <img src={notiImage} alt="PP here"/>
        <p>{notiHandle} {notiMessage} <span>{notiTimestamp}</span></p>
    </div>)
}