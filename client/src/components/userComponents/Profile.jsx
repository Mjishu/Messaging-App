import React from 'react'
import Navbar from '../generalComponents/Navbar';
import styles from "../../styles/userStyles/profile.module.css"

function Profile() {
    const [userData, setUserData] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [editing, setEditing] = React.useState(false)
    const [editedData,setEditedData] = React.useState({ //make sure data is what it is on backend
        username: "",
        email: "",
        instagram:'',
        facebook:"",
        twitter:"",
        color:"",
        profession: "",
        about: ""
    })
    const [hover,setHover] = React.useState(false)

    //?--------------------------------- Get Id 
    const idUrl = window.location.href;
    const urlSplit = idUrl.split("/")
    const id = urlSplit[urlSplit.length - 1]

    //* API Calls

    React.useEffect(()=>{
        fetch(`/api/user/find/${id}`)
            .then(res=>res.json())
            .then(data => {console.log(data),setUserData(data)})
            .catch(err => console.err(err))
            .finally(() => setLoading(false))

        fetch("/api/user/current")
            .then(res => res.json())
            .then(data => setCurrentUser(data))
            .catch(err => console.error(`there was an error fetching user ${err}`))
    },[id])

    React.useEffect(()=>{setEditedData({
        username:userData.username, 
        email:userData.email,    
        instagram: userData?.aboutUser?.connect?.instagram || "",
        facebook: userData?.aboutUser?.connect?.facebook || "",
        twitter: userData?.aboutUser?.connect?.twitter || "",
        color: userData.color,
        profession: userData?.aboutUser?.profession || "",
        about: userData?.aboutUser?.about || "",
    })},[userData])

    React.useEffect(() => {console.log(`Current user is${currentUser.id} profile page is of ${userData._id}`)},[userData])


    function handleSubmit(e){
        e.preventDefault()
        console.log(typeof editedData)
        const fetchParams= {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedData)
        }

        fetch(`/api/user/find/${userData._id}/update`, fetchParams)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(`error updating user ${err}`))

        setEditing(false);
    }

    function handleChange(e){
        const {name,value} = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    function mouseEnter(){setHover(true)};
    function mouseExit(){setHover(false)}

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
                <div className={styles.socialMediaInputHolder}>
                <label htmlFor="instagram">Instagram</label>
                <input name="instagram" onChange={handleChange} value={editedData.instagram}/>
                <label htmlFor="facebook">Facebook</label>
                <input name="facebook" onChange={handleChange} value={editedData.facebook}/>
                <label htmlFor="twitter">Twitter</label>
                <input name="twitter" onChange={handleChange} value={editedData.twitter}/>
                </div>
                <h4>About </h4>
                <div className={styles.aboutInputUser}>
                <label htmlFor="color">Color</label>
                <input type="color" name="color" onChange={handleChange} value={editedData.color} className={styles.colorInput}/>
                <label htmlFor="profession">Profession</label>
                <input type="text" name="profession" onChange={handleChange} value={editedData.profession}/>
                <label htmlFor="about"> About </label>
                <textarea  className={styles.aboutInput} name="about" onChange={handleChange} value = {editedData.about}/>
                </div>
                <div className={styles.editButtons}>
                <button onClick={()=>setEditing(false)} >Close</button>
                <button type="submit">Submit</button>
                </div>
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

    const styling = {boxShadow: hover ? `0 5px 5px ${userData.color} `: 'none', }

    return (
        <div className={styles.profileBodys}>
        <Navbar/>
        <div className={styles.content}>
        <div className={styles.mainInfo}>
        <h2>{userData.username}</h2>
        <p className={styles.aboutUser}>{userData?.aboutUser?.about} </p>
        </div>
        <div className={styles.profession}>
        <h4> Profession </h4>
        <p className={styles.aboutUser}>{userData.aboutUser.profession}</p>
        </div>
        <div className={styles.location}>
            <h4> Location </h4>
            <p className={styles.aboutUser}>{userData?.aboutUser?.location}</p> 
        </div>
        <div className={styles.connect}>
            <h4>Connect</h4>
            <div className={styles.logoHolder}><img src="/icons/instagramlogo.png" alt="instagram" /> <img src="/icons/facebooklogo.png" alt="facebook"/> <img src="/icons/twitterlogo.png" alt="twitter"/></div>
        </div>
        {currentUser.id === userData._id && <button onMouseEnter={mouseEnter} onMouseLeave={mouseExit} style={styling} className={styles.editButton} onClick={() => setEditing(true)}>Edit Profile</button>}
        {editing && editingData()}
        </div>
        </div>
    )
}

export default Profile
