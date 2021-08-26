import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export function Shout(props){

    const { uid, userHandle, userImage, likeCount, createdAt, body } = props.shoutData;

    return (<div className="shout">
        <div id="shoutHeader">
            <img src={userImage} alt={uid}/>
            <div id="shoutInfo">
                <p>
                    {userHandle}<br/>
                    <span>{createdAt}</span>
                </p>
            </div>
        </div>
        <br/>
        <div id="shoutBody">
            <p>{body}</p>
        </div>
        <div id="shoutFooter">
            <p id="likes"><FavoriteBorderIcon/>{likeCount}</p>
        </div>
    </div>)
}