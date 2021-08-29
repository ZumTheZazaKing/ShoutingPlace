import { firestore } from './Auth';

export function SearchResult(props){

    const {photoURL, username, bio, id} = props.resultData;

    const usersRef = firestore.collection("users");

    function viewProfile(){
        props.openViewProfile();
        usersRef.doc(id).get().then(doc => {
            props.setViews(doc.data())
        })
        props.setViewUid(id);
    }

    return (<div className="searchResult" onClick={() => viewProfile()}>
        <img src={photoURL} alt="PP here"/>
        <p><span>{username}</span><br/>{bio}</p>
    </div>)
}