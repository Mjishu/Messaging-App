import React from 'react' 
import Navbar from './components/generalComponents/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles/generalStyles/home.module.css"
import AllUsers from "./components/generalComponents/allUsers"

function App() {
    const [currentUser, setCurrentUser] = React.useState()
    const [allUsers, setAllUsers] = React.useState({})
    const navigate = useNavigate()

    React.useEffect(()=> {
        fetch("https://messaging-app-backend-miwr.onrender.com/api/user/current")
            .then(res => res.json())
            .then(data => setCurrentUser(data))
            .catch(error => console.error(error))

        fetch('/api/user/all')
            .then(res => res.json())
            .then(data => setAllUsers(data))
            .catch(err => console.error(err))
    },[])


    function handleClick(){
        fetch("/api/user/logout")
            .then(res => res.json())
            .then(data => data.success === true && window.location.reload())
            .catch(error => console.error(error))
    }

    function handleUserClick(id){
        navigate(`/user/${id}`)
    }

    const usersMapped = allUsers.length > 0 && allUsers.map(user => {
        return <AllUsers key={user._id} handleClick={handleUserClick} color={user.color} id={user._id} username={user.username}/>
    })

    React.useEffect(() => {console.log(currentUser?.message === "failed")},[currentUser])

    function userInteraction(){
                return (<div className={styles.userLinks}> 
                    <>
                    <Link to={"/sign-in"} className={styles.links}>Sign In</Link>
                    <Link to="/sign-up" className={styles.links}>Sign Up</Link>
                    </>
                    </div>)
    }

    function deleteButton(){
        return <button onClick={handleClick} className={`${styles.links} ${styles.linkButton}`}> Sign Out</button>
    }

    return (
        <div className={styles.homeBodys}>
        <Navbar/>
        <div className={styles.appItems}>
        <h1>App</h1>
        <div className={styles.userInfo}>
        <h1>Welcome: {currentUser && currentUser.username} </h1>
        </div>
        {currentUser?.message === "failed" ? userInteraction() : deleteButton()}
        </div>
        <div className={styles.usersMapped}>
        <h3> Users </h3>
        {usersMapped}
        </div>
        </div>
    )
}

export default App
