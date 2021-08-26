import firebase from './firebase';
import Button from '@material-ui/core/Button';

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();


export function SignIn(){

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const signinWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (<div id="SignIn">
        <h2>ShoutingPlace</h2>
        <p>A place where people can shout out their thoughts without having to keep it in</p>
        <Button variant="contained" color="secondary" onClick={signInWithGoogle}>
            Sign in With Google
        </Button>
        <br/><br/>
        <Button variant="contained" color="primary" onClick={signinWithFacebook}>
            Sign in With Facebook
        </Button>
    </div>)
}

export function SignOut(){
    return auth.currentUser && (
        <Button variant="contained" size="small" onClick={e => auth.signOut()}>
            Sign Out
        </Button>
    )
}