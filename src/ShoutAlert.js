import Button from '@material-ui/core/Button';

export function ShoutAlert(props){
    return (<div id="shoutAlert" className="hide" ref={props.shoutAlertRef}>
        <div id="shoutAlertContent">
            <p>Delete the shout?</p>
            <Button onClick={() => props.closeShoutAlertRef()}>NO</Button>
            <Button onClick={() => {props.deleteShout(); props.closeShoutAlertRef()}} variant="contained" color="secondary">YES</Button>
        </div>
    </div>)
}