import React from 'react'
import Navbar from '../generalComponents/Navbar';
import styles from "../../styles/userStyles/profile.module.css"

function Profile() {
    const [userData, setUserData] = React.useState([]);
    const [loading,setLoading] = React.useState(true)
    const [editing, setEditing] = React.useState(false)
    const [editedData,setEditedData] = React.useState({ //make sure data is what it is on backend
        username: "",
        email: "",
        instagram:  ""
    })

    //?--------------------------------- Get Id 
    const idUrl = window.location.href;
    const urlSplit = idUrl.split("/")
    const id = urlSplit[urlSplit.length - 1]

    //* API Calls

    React.useState(()=>{
        fetch(`/api/user/find/${id}`)
        .then(res=>res.json())
        .then(data => {console.log(data),setUserData(data)})
        .catch(err => console.err(err))
        .finally(() => setLoading(false))
    },[id])

    React.useState(()=>{setEditedData({
        username:userData.username, 
        email:userData.email, 
        instagram: userData?.aboutUser?.socialMedia?.instagram || ""
    })},[userData])


    function handleSubmit(e){
        e.preventDefault()
        console.log(editedData)
    }

    function handleChange(e){
        const {name,value} = e.target;
        setEditedData(prevData => ({
            [name]: value
        }))
    }

    function editingData(){ //The values dont seem to be taking the editedData.value ?
        return(
            <div className={styles.dialogBackdrop} >
            <div className={styles.editBoard}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input name="username" onChange={handleChange} value={editedData.username}/>
                <label htmlFor="email">Email</label>
                <input name = "email"onChange={handleChange} value={editedData.email}/>
                <h4>Social Media </h4>
                <label htmlFor="instagram">Instagram</label>
                <input name="instagram" onChange={handleChange} value={editedData.instagram}/>
                <button onClick={()=>setEditing(false)}>Close</button>
                <button >Submit</button>
            </form>
            </div>
            </div>
        )
    }

    function handleBackdropClick(e){
        if(e.target.closest('.modalDialog')) return;
        setEditing(false)
    }
    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div className={styles.profileBody}>
            <Navbar/>
            <div className={styles.content}>
                <h1>Welcome {userData.username}</h1>
                <p>Email: {userData.email} </p>
                <button onClick={() => setEditing(true)}>Edit Profile</button>
            {editing && editingData()}
            </div>
        </div>
  )
}

export default Profile
