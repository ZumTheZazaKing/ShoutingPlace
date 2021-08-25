import Home from "@material-ui/icons/Home";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import { auth } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export function Navbar(){
    const [user] = useAuthState(auth);

    return (<div id="Navbar">
        <p>ShoutingPlace</p>
        {user ? <div id="navButtons">
                    <Tooltip title="Home">
                        <Home className="btn"/>
                    </Tooltip>
                    <Tooltip title="Dashboard">
                        <AccountCircleIcon className="btn"/>
                    </Tooltip>
                </div> 
                : ""}
    </div>)
}