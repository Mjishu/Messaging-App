import React from "react"
import {useNavigate} from "react-router-dom"
import styles from "../../styles/messageStyles/Messages.module.css"
import Navbar from "../generalComponents/Navbar"
import FindUsers from "../userComponents/FindUsers"

function Messages(){
    const [allUserMessages, setAllUserMessages] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [allUsers, setAllUsers] = React.useState()
    const [showUsers,setShowUsers] = React.useState(false)
    const [allMessages,setAllMessages] = React.useState()
    const navigate = useNavigate()

    // I think that it should get userId and then send that id to api/messages/whatever and have that fetch messages
    React.useEffect(() => {
        fetch("/api/user/current")
            .then(res => res.json())
            .then(data => setCurrentUser(data))
            .catch(err => console.error(`An error happened fetching data: ${err}`))

        fetch("/api/user/all")
            .then(res => res.json())
            .then(data => setAllUsers(data))
            .catch(err => console.error(`error fetching all users: ${err}`))
        
        fetch("/api/messages/all")
        .then(res => res.json())
        .then(data => setAllMessages(data))
        .catch(err => console.error(`error fetching all messages: ${err}`))
    },[])

    React.useEffect(()=> {
        currentUser && fetch(`/api/messages/user/${currentUser.id}`)
            .then(res => res.json())
            .then(data => setAllUserMessages(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    },[currentUser,loading]) //need this to depend on something so i dont have to refresh the page to get it to show new messages


    function handleClick(id){
        navigate(`/message/${id}`)
    }

    function openUser(id){
        let messageExists = false;
        let postId;

        for(const message of allMessages){
            if(message.author._id === id && message.recipient._id === currentUser._id || message.recipient._id === id && message.author._id === currentUser._id){
                messageExists = true
                postId = message._id
            }}
        if(messageExists){navigate(`/message/${postId}`)}
        else{
            fetch("/api/messages/create", {method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify({id:id})})
            .then(res => res.json())
            .then(data => data.message === "Success" && navigate(`/message/${data.id}`))
            .catch(error => console.error(`error creating message ${error}`))
        }
    }

    const messagesMapped =  allUserMessages?.map(message => {
        return (
            <div key={message._id} onClick={() => handleClick(message._id)} className={styles.messagesHolder}>
            <h3>Author: {message.author.username}</h3>
            <h4>Recipient: {message.recipient.username} </h4>
            </div>
        )
    })

    function handleBackdropClick(e){
        if(e.target.closest('.modalDialog')) return;
        setShowUsers(false);
    }

    const mapAllUsers = allUsers?.map(user => { //Doesnt load on conditional
        return(
            <div className={styles.mappedUser} key={user._id} onClick={() => openUser(user._id)}>
            <h4>{user.username}</h4>
            </div>
        )
    })

    if(loading){
        return <h2>Loading... </h2>
    }

    return(
        <div className={styles.page}>
        <Navbar />
        <div className={styles.content}>
        <h1>Messages</h1>
        {messagesMapped}
        </div> 
        <button className={styles.searchButton} onClick={() => setShowUsers(true)}><img src="/icons/search.svg" alt="search icon" className={styles.searchButtonImg}/></button>
        {showUsers && (
            <div className={styles.dialogBackdrop} onClick={handleBackdropClick}>
                <div className={styles.customDialog}>
                    {mapAllUsers}
                    <button onClick={() => setShowUsers(false)}>Close</button>
                </div>
            </div>
        )}
        </div>
    )
}
//Issue loading the svg for button

export default Messages 
