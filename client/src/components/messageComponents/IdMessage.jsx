import React from "react"
import Navbar from "../generalComponents/Navbar"
import styles from "../../styles/messageStyles/IdMessage.module.css"

function IdMessage(){
    const [messageData, setMessageData] = React.useState()
    const [loading, setLoading] = React.useState(true)

    const url = window.location.href;
    const splitUrl = url.split("/");
    const messageId = splitUrl[splitUrl.length -1];
    
    React.useEffect(() => {
        fetch(`/api/messages/${messageId}`)
        .then(res => res.json())
        .then(data => setMessageData(data))
        .catch(err => console.log(`error fetching message: ${err}`))
        .finally(() => setLoading(false))
    }, [])
    
    if (loading){
        return <h2>Loading.. </h2>
    }

    return (
        <div className={styles.content}>
                <Navbar/>
            <div className={styles.messageBody}>
                <h1>Your Message with {messageData?.recipient?.username}</h1>
                <p> {messageData?.body} </p>
            </div>
        </div>
    )
}

export default IdMessage


