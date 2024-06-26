import React from 'react' 
import Navbar from './components/generalComponents/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles/generalStyles/home.module.css"

function App() {
    const [currentUser, setCurrentUser] = React.useState()
    const navigate = useNavigate()

  React.useEffect(()=> {
    fetch("/api/user/current")
    .then(res => res.json())
    .then(data => setCurrentUser(data))
    .catch(error => console.error(error))
  },[])

    React.useEffect(()=>{console.log(currentUser)},[currentUser])

function handleClick(){
    fetch("/api/user/logout")
    .then(res => res.json())
    .then(data => data.success == true && window.location.reload())
    .catch(error => console.error(error))
}

  return (
    <div className={styles.homeBodys}>
      <Navbar/>
      <div className={styles.appItems}>
        <h1>App</h1>
        <div className={styles.userInfo}>
            <h1>Welcome: {currentUser && currentUser.username} </h1>
      </div>
        <div className={styles.userLinks}> 
        {currentUser && currentUser.message === "none" ? (
            <>
                <Link to={"/sign-in"} className={styles.links}>Sign In</Link>
                <Link to="/sign-up" className={styles.links}>Sign Up</Link>
            </>
        ) : null}
        </div>
      {currentUser && currentUser.message !== "none" ?(
          <button onClick={handleClick} className={styles.links}> Sign Out</button>
      ) : null}
      </div>
    </div>
  )
}

export default App
