import styles from "../../styles/messageStyles/messageHolder.module.css"
import {format} from "date-fns"

function MessageHolder(props){
    const formatedTime = format(props.time, "do MMMM")

    return (
        <div className={styles.body} onClick={() => props.handleClick(props.messageId)}>
            <div className={styles.userColor} style={{backgroundColor:props.userColor}}></div>
            <h4 className={styles.username}>{props.username}</h4>
            <p className={styles.overview}> {props.overview}</p>
            <p className={styles.time}> {formatedTime} </p>
        </div>
    )
}

export default MessageHolder
