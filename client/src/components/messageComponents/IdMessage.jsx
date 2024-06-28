import React from "react"
import Navbar from "../generalComponents/Navbar"
import styles from "../../styles/messageStyles/IdMessage.module.css"
import MessageDelete from "./MessageDelete"
import {format, isThisHour} from "date-fns"

function IdMessage(){
    const [messageData, setMessageData] = React.useState({})
    const [loggedInUser,setLoggedInUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [textValue, setTextValue] = React.useState({
        message: "",
        author: null,
        timestamp: Date.now()
    })
    const [showItems,setShowItems] = React.useState({
        messageId: null,
        deleteBox:false, 
    })
    const chatContainerRef = React.useRef(null);

    const url = window.location.href;
    const splitUrl = url.split("/");
    const messageId = splitUrl[splitUrl.length -1];

    React.useEffect(() => {
        fetch(`/api/messages/${messageId}`)
            .then(res => res.json())
            .then(data => data.message==="failed" ? navigate("/"):setMessageData(data))
            .catch(err => console.log(`error fetching message: ${err}`))
            .finally(() => setLoading(false))
    }, [messageId])

    React.useEffect(() => {
        fetch("/api/user/current")
            .then(res => res.json())
            .then(data => {
                setLoggedInUser(data)
                setTextValue(prevValues => ({...prevValues, author:data.id}))
            })
            .catch(error => console.error(`error fetching user data: ${error}`))
    },[messageId])

    React.useEffect(() => { //sets to bottom of messages
        const chatContainer = chatContainerRef.current;
        if(chatContainer){
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    },[messageData])


    if (loading){
        return <h2>Loading.. </h2>
    }

    function handleChange(e){
            const {name,value} = e.target;
            setTextValue(prevText => ({
                ...prevText,
                [name]: value
            }))
        }


    function handleSubmit(e){ //only works for author?
        e.preventDefault()
        const fetchParams= {method:'POST', headers:{'Content-Type': "application/json"}, body: JSON.stringify(textValue)}

        fetch(`/api/messages/${messageId}/send-message`, fetchParams)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(`error sending message ${err}`))
        
        setTextValue(prevText => ({...prevText, message: ""}))
    }


    const messageBodyMapped = messageData?.body?.map(message => { 
        let formatedTime
        const todaysDate = new Date();
        const todaysDateSplit = todaysDate.toISOString().split("T")[0];
        const storedDateSplit = message.timestamp.split("T")[0]
        let isCurrentUser

        //Check hour
        if(todaysDateSplit === storedDateSplit){
            formatedTime = `${format(message.timestamp, "h aaa")} sent`
        }
        else{
            formatedTime = format(message.timestamp, "do MMMM")
        }
        if (message.author.username === loggedInUser.username){
            isCurrentUser = true;
        }
        
        return (
            <div key={message._id} className={isCurrentUser ?`${styles.messageHolder} ${styles.isCurrentUser}` :styles.messageHolder}>
                <p className={styles.username}>{message.author?.username} </p>
                <h6 className={styles.message}>{message.message} </h6>
                <p className={styles.time}>{formatedTime}</p>
            </div>
        )
    })
    
    function handleBackdropClick(e){
        if(e.target.closest('.modalDialog')) return;
        setShowItems(prevItems=>({...prevItems, showUsers:false, deleteBox:false}));
    }
    return (
        <div className={styles.body}>
        <Navbar/>
        <div className={styles.messageBody}>
        <h1>Your Message with {messageData?.recipient?.username}</h1>
        <div className={styles.messageParts} ref={chatContainerRef}>
            {messageBodyMapped}
        </div>
        <div className={styles.messageInputContent}>
        <form autocomplete="off" className={styles.inputOptions} onSubmit={handleSubmit}>
        <input type="message" className={styles.messageInput} name="message" placeholder="message..." value={textValue.message} onChange={handleChange}/>
        <button type="submit" className={styles.messageSubmit} name="submit">Send</button>
        </form>
        <button className={styles.deleteButton} onClick={() => setShowItems(prevItems=>({...prevItems,deleteBox:true, messageId:messageData._id}))}>Delete</button>
        </div>
        <MessageDelete showItems={showItems} setShowItems={setShowItems} handleBackdropClick={handleBackdropClick} Idmessage={true}/>
        </div>
        </div>
    )

        }
export default IdMessage


