import { Link } from "react-router-dom"
import styles from "../../styles/generalStyles/navbar.module.css"

function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/message" className={styles.link}><img src="" alt="messages"/></Link>
    </div>
  )
}

export default Navbar
