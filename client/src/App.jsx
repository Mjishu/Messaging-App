import React from 'react'
import Navbar from './components/generalComponents/Navbar'
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'
import styles from "./styles/generalStyles/home.module.css"
>>>>>>> userProfile

function App() {
  const [backendUsers,setBackendUsers] = React.useState([])

  React.useEffect(()=>{
    fetch("/api/user/all")
    .then(res => res.json())
    .then(data => setBackendUsers(data))
    .catch(error => console.error(error))
  },[])

  React.useEffect(()=> {
    fetch("/api/user/current")
    .then(res => res.json())
    .then(data => console.log (data))
    .catch(error => console.error(error))
  },[])

  const usersMapped = backendUsers && backendUsers.map(item => {
    return (
      <div key={item._id}>
        <p>{item.username}</p> 
        <p>{item.email}</p>
      </div>
    )
  })

  return (
<<<<<<< HEAD
    <div>
      <Navbar/>
      <h1>App</h1>
      
      {usersMapped}
=======
    
    <div className={styles.homeBody}>
      <Navbar/>
      <div className={styles.appItems}>
        <h1>App</h1>
        {usersMapped}
        <div className={styles.userLinks}>
          <Link to={"/sign-in"} className={styles.links}>Sign In</Link>
          <Link to="/sign-up" className={styles.links}>Sign Up</Link>
        </div>
      </div>
>>>>>>> userProfile
    </div>
  )
}

export default App
