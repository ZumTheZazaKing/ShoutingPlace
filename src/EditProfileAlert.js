export function EditProfileAlert(props){
    return (<div id="EditProfileAlert" className="hide" ref={props.editProfileAlertRef}>
        <div id="alertContent">
            <span onClick={() => props.closeAlert()}>&times;</span>
            <br/>
            <p>{props.alertMsg}</p>
        </div>
    </div>)
}