export function NotificationPost(props){
    return (<div id="notificationPost" className="hide" ref={props.notiPostRef}>
        <div id="notiPostContent">
            <span id="close" onClick={() => props.closeNotiPost()}>&times;</span>
            <div id="notiPostHeader">
                <img src={props.notiPostImage} alt="PP here"/>
                <p><span>{props.notiPostName}</span>
                <br/>{props.notiPostTime}</p>
            </div>
            <div id="notiPostBody">
                {props.notiPostBody}
            </div>
            <br/>
            <div id="notiPostFooter">
                <img src={props.notiPostHandleImage} alt="pp here"/>
                <p>{props.notiPostHandle} {props.notiPostMessage === "commented on your shout" ? "commented on this shout" : "liked this shout"}</p>
            </div>
        </div>
    </div>)
}