import Home from "@material-ui/icons/Home";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';

import { auth, firestore } from './Auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';

export function Navbar(props){
    const [user] = useAuthState(auth);

    const usersRef = firestore.collection("users");

    const [notiCount, setNotiCount] = useState(0);

    setInterval(() => {
        if(auth.currentUser === null){
            return;
        } else {
            usersRef.doc(auth.currentUser.uid).get().then(doc => {
                setNotiCount(doc.data().notiCount);
            })
        }
    },1000)

    function goToHome(){
        props.closeProfile();
        props.openHomePage();
        props.closeViewProfile();
        props.closeNoti();
        props.closeSearch();
    }

    function goToProfile(){
        props.openProfile();
        props.closeHomePage();
        props.closeViewProfile();
        props.closeNoti();
        props.closeSearch();
    }

    function goToNotifications(){
        props.openNoti();
        props.closeProfile();
        props.closeHomePage();
        props.closeViewProfile();
        props.closeSearch();
        usersRef.doc(auth.currentUser.uid).update({
            notiCount:0
        })
        setNotiCount(0);
    }

    function goToSearch(){
        props.closeNoti();
        props.closeProfile();
        props.closeHomePage();
        props.closeViewProfile();
        props.openSearch();
    }

    return (<div id="Navbar">
        <p>ShoutingPlace</p>
        {user ? <div id="navButtons">
                    <Tooltip title="Search">
                        <SearchIcon onClick={() => goToSearch()} className="btn"/>
                    </Tooltip>
                    <Tooltip title="Notifications">
                        <Badge color="secondary" badgeContent={notiCount} min={0} max={10} overlap="circular">
                            <NotificationsIcon onClick={() => goToNotifications()} className="btn"/>
                        </Badge>
                    </Tooltip>
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