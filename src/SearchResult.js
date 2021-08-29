export function SearchResult(props){

    const {photoURL, username, bio} = props.resultData;

    return (<div className="searchResult">
        <img src={photoURL} alt="PP here"/>
        <p><span>{username}</span><br/>{bio}</p>
    </div>)
}