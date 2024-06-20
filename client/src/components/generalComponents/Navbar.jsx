import { Link } from "react-router-dom"
<<<<<<< HEAD

function Navbar() {
  return (
    <div>
        <Link to="/">Home</Link>
=======
import styles from "../../styles/generalStyles/navbar.module.css"

function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/" className={styles.link}>Home</Link>
>>>>>>> userProfile
    </div>
  )
}

export default Navbar