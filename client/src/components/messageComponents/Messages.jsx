import React from "react"
import {useNavigate} from "react-router-dom"
import styles from "../../styles/messageStyles/Messages.module.css"
import Navbar from "../generalComponents/Navbar"
import FindUsers from "../userComponents/FindUsers"
import MessageDelete from "./MessageDelete"
import MessageHolder from "./MessageHolder"

function Messages(){
    const [allUserMessages, setAllUserMessages] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [allUsers, setAllUsers] = React.useState()
    const [showItems,setShowItems] = React.useState({
        showUsers: false,
        deleteBox: false,
        messageId: null,
    })
    const [allMessages,setAllMessages] = React.useState()
    const navigate = useNavigate()

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
        .catch(err => console.error(`error f8763a0etching all messages: ${err}`))
    },[])

    React.useEffect(()=> {
        currentUser && fetch(`/api/messages/user/${currentUser.id}`)
            .then(res => res.json())
            .then(data => setAllUserMessages(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
    },[currentUser,loading]) //need this to depend on something so i dont have to refresh the page to get it to show new messages

    //Handle Clicking functions//    

    function handleClick(id){
        navigate(`/message/${id}`)
    }

    function openUser(id){
        let messageExists = false;
        let postId;

        for(const message of allMessages){ 
            if(message.author._id === id && message.recipient._id === currentUser.id){
                messageExists = true
                console.log("message exists")
                postId = message._id
            }
            else if(message.recipient._id === id && message.author._id === currentUser.id){
                messageExists = true
                console.log("message exists")
                postId = message._id
            }
        }
        if(messageExists){navigate(`/message/${postId}`)}
        else{
            console.log("message does not exist")
            fetch("/api/messages/create", {method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify({id:id})})
            .then(res => res.json())
            .then(data => data.message === "Success" && navigate(`/message/${data.id}`))
            .catch(error => console.error(`error creating message ${error}`))
        }
    }

    function handleBackdropClick(e){
        if(e.target.closest('.modalDialog')) return;
        setShowItems(prevItems=>({...prevItems, showUsers:false, deleteBox:false}));
    }


    // Mapping functions //    

    const messagesMapped =  allUserMessages?.map(message => { //call messageHolder here
        let otherUser
        let otherUserColor
        if(message.author.username === currentUser.username){
            otherUser = message.recipient.username
            otherUserColor = message.recipient.color
        }
        else if(message.recipient.username === currentUser.username){
            otherUser = message.author.username
            otherUserColor = message.author.color
        }

        return (
            <div key={message._id}>
            {/*<div  onClick={() => handleClick(message._id)} className={styles.messagesHolder}>
                <h3>Author: {message.author.username}</h3>
                <h4>Recipient: {message.recipient.username} </h4>
                </div>
                <button onClick={() => setShowItems(prevItems=>({...prevItems,deleteBox:true, messageId:message._id}))}>Del</button>
            */} 
            <MessageHolder  
                username={otherUser}
                overview={"we put some lorem ipsum here and see how it goes:3"} 
                userColor={otherUserColor}
                time={message.updatedAt}
                setShowItems={setShowItems}
                handleClick={handleClick}
                messageId = {message._id}
            />
            </div>
        )
    })


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
        <div className={styles.body}>
        <Navbar />
        <div className={styles.content}>
            <h1>Messages</h1>
            <div className={styles.holderOfMessages}>
            {messagesMapped}
            </div>
        </div> 
        <button className={styles.searchButton} onClick={() => setShowItems(prevItems => ({...prevItems,showUsers:true }))}>
        <img src="/icons/search.svg" alt="search icon" className={styles.searchButtonImg}/></button>
        {showItems.showUsers && (
            <div className={styles.dialogBackdrop} onClick={handleBackdropClick}>
                <div className={styles.customDialog}>
                    {mapAllUsers}
                    <button className={styles.closeUsers} onClick={() => setShowItems(prevItems=>({...prevItems,showUsers:false}))}>Close</button>
                </div>
            </div>)}
        <MessageDelete showItems={showItems} setShowItems={setShowItems} handleBackdropClick={handleBackdropClick}/>
        </div>
    )
}
//Issue loading the svg for button

export default Messages 
