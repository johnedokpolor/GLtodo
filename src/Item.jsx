function Item(props) {
    // console.log(props.id)
    return(
        <li className={props.completed? "checked" : ""} onClick={props.ticktask}>{props.task}
        <span>x</span></li>
    )
}
export default Item