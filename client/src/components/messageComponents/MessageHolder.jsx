import styles from "../../styles/messageStyles/messageHolder.module.css"
import {format} from "date-fns"

function MessageHolder(props){
    const formatedTime = format(props.time, "do MMMM")

    const styling= {
        backgroundColor:props.userColor,
        boxShadow:`42px 3px 12px ${props.userColor}00,27px 2px 11px ${props.userColor}01,15px 1px 9px ${props.userColor}05,7px 0 7px ${props.userColor}09,2px 0 4px ${props.userColor}10`
    };

    return (
        <div className={styles.body} onClick={() => props.handleClick(props.messageId)}>
            <div className={styles.userColor} style={styling}></div>
            <h4 className={styles.username}>{props.username}</h4>
            <p className={styles.overview}> {props.overview}</p>
            <p className={styles.time}> {formatedTime} </p>
        </div>
    )
}

export default MessageHolder
