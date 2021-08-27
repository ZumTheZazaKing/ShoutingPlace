import Home from "@material-ui/icons/Home";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { auth } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Navbar(props){
    const [user] = useAuthState(auth);

    function goToHome(){
        props.closeProfile();
        props.openHomePage();
    }

    function goToProfile(){
        props.openProfile();
        props.closeHomePage();
    }

    return (<div id="Navbar">
        <p>ShoutingPlace</p>
        {user ? <div id="navButtons">
                    <Tooltip title="Home">
                        <Home onClick={() => goToHome()} className="btn"/>
                    </Tooltip>
                    <Tooltip title="Profile">
                        <AccountCircleIcon onClick={() => goToProfile()} className="btn"/>
                    </Tooltip>
                </div> 
                : ""}
    </div>)
}