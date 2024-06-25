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
    const [showItems,setShowItems] = React.useState({
        showUsers: false,
        deleteBox: false,
    })
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

    //Handle Clicking functions//    

    function handleClick(id){
        navigate(`/message/${id}`)
    }

    function openUser(id){
        let messageExists = false;
        let postId;

        for(const message of allMessages){ //Creates message even if one exists with both users?
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
            //.catch(error => console.error(`error creating message ${error}`))
        }
    }

    function handleBackdropClick(e){
        if(e.target.closest('.modalDialog')) return;
        setShowItems(prevItems=>({...prevItems, showUsers:false}));
    }

    function deleteMessage(id){ //Make a custom dialog box that says are you sure you want to delete?
        console.log(id) 
    }

    // Mapping functions //    

    const messagesMapped =  allUserMessages?.map(message => {
        return (
            <div key={message._id}>
                <div  onClick={() => handleClick(message._id)} className={styles.messagesHolder}>
                <h3>Author: {message.author.username}</h3>
                <h4>Recipient: {message.recipient.username} </h4>
                </div>
                <button onClick={() => deleteMessage(message._id)}>Del</button>
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
        <div className={styles.page}>
        <Navbar />
        <div className={styles.content}>
        <h1>Messages</h1>
        {messagesMapped}
        </div> 
        <button className={styles.searchButton} onClick={() => setShowItems(prevItems => ({...prevItems,showUsers:true }))}><img src="/icons/search.svg" alt="search icon" className={styles.searchButtonImg}/></button>
        {showItems.showUsers && (
            <div className={styles.dialogBackdrop} onClick={handleBackdropClick}>
                <div className={styles.customDialog}>
                    {mapAllUsers}
                    <button onClick={() => setShowItems(prevItems=>({...prevItems,showUsers:false}))}>Close</button>
                </div>
            </div>)}
        {showItems.deleteBox && ( //idk what to do with this my brain is tired
            <div>
                <h3> Are you sure you want to delete this </h3>
                <button onClick={() => setShowItems(prevItems=>({...prevItems,deleteBox:false}))}>Cancel</button>
                <button onClick={() => deleteMessage("meow")}>Delete</button>
            </div>
        )}
        </div>
    )
}
//Issue loading the svg for button

export default Messages 
