import Collapse from '@material-ui/core/Collapse';

import { useState } from 'react';

export function NotificationPost(props){

    const [isChecked, setIsChecked] = useState(false);

    return (<div id="notificationPost" className="hide" ref={props.notiPostRef}>
        <div id="notiPostContent">
            <span id="close" onClick={() => props.closeNotiPost()}>&times;</span>
            <div id="notiPostHeader">
                <img src={props.notiPostImage} alt="PP here"/>
                <p><span>{props.notiPostName}</span>
                <br/>{props.notiPostTime}</p>
            </div>
            <div id="notiPostBody">
                <p>{props.notiPostBody}</p>
                <br/>
                {props.notiPostBodyImage ? <Collapse in={isChecked} collapsedSize="100px">
                    <img src={props.notiPostBodyImage} onClick={isChecked ? () => setIsChecked(false) : () => setIsChecked(true)} alt="Post img here"/>
                </Collapse>
                : ""}
            </div>
            <div id="notiPostFooter">
                <img src={props.notiPostHandleImage} alt="pp here"/>
                <p>{props.notiPostHandle} {props.notiPostMessage === "commented on your shout" ? "commented on this shout" : "liked this shout"}</p>
            </div>
        </div>
    </div>)
}