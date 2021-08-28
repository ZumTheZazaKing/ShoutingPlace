export function Notification(props){

    const { notiHandle, notiImage, notiMessage, notiTimestamp} = props.notiData;


    return (<div className="notification">
        <img src={notiImage} alt="PP here"/>
        <p>{notiHandle} {notiMessage} ({notiTimestamp})</p>
    </div>)
}