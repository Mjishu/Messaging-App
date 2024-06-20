import { Link } from "react-router-dom"
import styles from "../../styles/generalStyles/navbar.module.css"

function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link to="/" className={styles.link}>Home</Link>
    </div>
  )
}

export default Navbar
