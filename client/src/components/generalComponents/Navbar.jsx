import { Link } from "react-router-dom"
import styles from "../../styles/generalStyles/navbar.module.css"
import React from "react"

function Navbar() {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    fetch("https://messaging-app-backend-miwr.onrender.com/api/user/current")
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error(`there was an error fetching user from nav, ${err}`))
  }, [])

  return (
    <div className={styles.navbar}>
      <div className={styles.linkHolder}>
        <Link to={`/user/${userData.id}`} className={styles.link}>Profile</Link>
        <Link to="/" className={styles.link}>Home</Link>
      </div>
      <div className={styles.linkHolder}>
        <Link to="/message" className={styles.link}><img src="" alt="Messages" /></Link>
        <img className={styles.logo} src="/icons/message_logo.png" alt="logo" />
      </div>
    </div>
  )
}

export default Navbar
