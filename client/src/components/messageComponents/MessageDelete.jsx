import styles from "../../styles/messageStyles/Messages.module.css"
import {useNavigate} from "react-router-dom"

function MessageDelete(props){
    const navigate = useNavigate()
    function deleteMessage(id){  
        const fetchParams = {
            method : "DELETE",
            headers:{"Content-Type": "application/json"}
        }

        fetch(`/api/messages/delete/${id}`, fetchParams)
        .then(res => res.json())
        .then(data => data.message === "success" && (props.Idmessage ? navigate("/message") : window.location.reload() ))
        .catch(err=> console.error(`there was an error trying to delete your message: ${err}`))

        props.setShowItems(prevItems=>({...prevItems,deleteBox:false, messageId:null}))

    }
    return (
        <div> 
        {props.showItems.deleteBox && ( 
            <div className={styles.dialogBackdrop} onClick={props.handleBackdropClick}>
            <div className={styles.customDialog}>
            <h3> Are you sure you want to delete this </h3>
            <button onClick={() => props.setShowItems(prevItems=>({...prevItems,deleteBox:false}))}>Cancel</button>
            <button onClick={() => deleteMessage(props.showItems.messageId)}>Delete</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default MessageDelete
