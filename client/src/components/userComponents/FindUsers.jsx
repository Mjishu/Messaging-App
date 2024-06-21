import React from "react"

function FindUsers(){
    const [users,setUsers] = React.useState()

    React.useEffect(() => {
        fetch("/api/users/all")
        .then(res => res.json())
        .then(data => setUsers(data ))
        .catch(error => console.error(`Error fetching users: ${error}`))
    },[])

    const usersMapped = users?.map (user => {
        return (
            <div key={user._id}> 
                <h3>{user.username}</h3>
            </div>
        )
    })

    return(
        <div></div>
    )
}

export default FindUsers
