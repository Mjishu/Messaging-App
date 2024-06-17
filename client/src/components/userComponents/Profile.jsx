import React from 'react'
import Navbar from '../generalComponents/Navbar';

function Profile() {
    const [userData, setUserData] = React.useState([]);
    const [loading,setLoading] = React.useState(true)

    //?--------------------------------- Get Id 
    const idUrl = window.location.href;
    const urlSplit = idUrl.split("/")
    const id = urlSplit[urlSplit.length - 1]

    //* API Calls

    React.useState(()=>{
        fetch(`/api/user/${id}`)
        .then(res=>res.json())
        .then(data => {console.log(data),setUserData(data)})
        .catch(err => console.err(err))
        .finally(() => setLoading(false))
    },[id])

    React.useState(()=>{console.log(userData)},[userData])

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div>
            <Navbar/>
            <h1>Welcome {userData.username}</h1>

        </div>
  )
}

export default Profile