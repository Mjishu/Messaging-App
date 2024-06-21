import React from "react"
import {useNavigate} from "react-router-dom"
import styles from "../../styles/messageStyles/Messages.module.css"
import Navbar from "../generalComponents/Navbar"
import FindUsers from "../userComponents/FindUsers"

function Messages(){
    const [allMessages, setAllMessages] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [allUsers, setAllUsers] = React.useState()
    const navigate = useNavigate()
    
    // I think that it should get userId and then send that id to api/messages/whatever and have that fetch messages
    React.useEffect(() => {
        fetch("/api/user/current")
        .then(res => res.json())
        .then(data => setCurrentUser(data))
        .catch(err => console.error(`An error happened fetching data: ${err}`))
    },[])

    React.useEffect(()=> {
        currentUser && fetch(`/api/messages/user/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setAllMessages(data))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },[currentUser])

    React.useEffect(()=>{
        fetch("/api/user/all")
        .then(res => res.json())
        .then(data => setAllUsers(data))
        .catch(err => console.error(`error fetching all users: ${err}`))
    }, [])

    function handleClick(id){
        //render route based on id so render /message/:id, find a way to hook this up in router
        navigate(`/message/${id}`)
    }

    function findUsers(){
        console.log("finding Users")
    }
    const allUsersMapped = allUsers?.map(user => {
        return (
            <div className={styles.allUsers} key={user._id} hidden>
                <h4>{user.username} </h4>
            </div>
        )
    })

    
    const messagesMapped =  allMessages?.map(message => {
        return (
            <div key={message._id} onClick={() => handleClick(message._id)} className={styles.messagesHolder}>
                <h3>Author: {message.author.username}</h3>
                <h4>Recipient: {message.recipient.username} </h4>
                <p>Text: {message.body}</p>
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
            <button className={styles.searchButton} onClick={findUsers}><img src="/icons/search.svg" alt="search icon" className={styles.searchButtonImg}/></button>
            {allUsersMapped}
        </div>
    )
}
//Issue loading the svg for button

export default Messages 
