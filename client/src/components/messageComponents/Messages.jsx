import React from "react"

function Messages(){
    const [allMessages, setAllMessages] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState([])
    
    // I think that it should get userId and then send that id to api/messages/whatever and have that fetch messages
    React.useEffect(() => {
        fetch("/api/user/current")
        .then(res => res.json())
        .then(data => setCurrentUser(data))
        .catch(err => console.error(`An error happened fetching data: ${err}`))
    },[])

    React.useEffect(()=> {
        fetch("api/messages/all")
        .then(res => res.json())
        .then(data => setAllMessages(data))
        .catch(error => console.error(error))
    },[])
    React.useEffect(()=>{console.log(currentUser)}, [currentUser])
    
    const messagesMapped = allMessages && allMessages.length > 0 && allMessages.map(message => {
        return (
            <div key={message._id}>
                <h3>{message.author.username}</h3>
            </div>
        )
    })

    return(
        <div>
            <h1>Messages</h1>
        {messagesMapped}
        </div>
    )
}

export default Messages 
