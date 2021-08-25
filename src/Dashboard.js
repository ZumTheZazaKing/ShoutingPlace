import { SignOut, auth } from "./Auth"

export function Dashboard(){
    return (<div id="dashboard">
        <h1>Dashboard</h1>
        <img id="profilePicture" src={auth.currentUser.photoURL} alt="profile phot should be here"/>
        <h2>{auth.currentUser.displayName}</h2>
        <p id="bio">Bio...</p>
        <p id="website"><a href="">Website</a></p>
        <p>Location:</p>
        <p>Joined</p>
        <br/>
        <SignOut/>
    </div>)
}