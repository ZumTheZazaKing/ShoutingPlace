export function Comment(props){

    const { commentBody, commentHandle, commentImage, commentTimestamp, id, uid} = props.commentData;

    return (<div className="comment" id={id} name={uid}>
        <div id="commentHeader">
            <img src={commentImage} alt="PP here"/>
            <p><span>{commentHandle}</span><br/>{commentTimestamp}</p>
        </div>
        <div id="commentBody">
            {commentBody}
        </div>
    </div>)
}