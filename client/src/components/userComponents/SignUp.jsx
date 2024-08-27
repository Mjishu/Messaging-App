import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../generalComponents/Navbar';
import styles from "../../styles/userStyles/sign-up-styles.module.css"


function SignUp() {
    const [userData, setUserData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorCreate, setErrorCreate] = React.useState()
    const navigate = useNavigate();


    function handleChange(e) {
        const { name, value } = e.target;
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const fetchParams = { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) }
        fetch("https://messaging-app-backend-miwr.onrender.com/api/user/create", fetchParams)
            .then(res => res.json())
            .then(data => {
                data.message === "success" ? navigate("/") : setErrorCreate(data.message)
            })
            .catch(error => console.error("Error creating user", error))

        setUserData({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    errorCreate && alert(errorCreate)

    return (
        <div className={styles.body}>
            <div className={styles.image}>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>Website name</h1>
                <form autoComplete="false" className={styles.sign_up_holder} onSubmit={handleSubmit}>
                    <h1 className={styles.signUp}>Create Account</h1>
                    <div className={styles.inputItems}>
                        <div className={styles.itemInfo}>
                            <label htmlFor="username" className={styles.label} >Username: </label>
                            <input type="text" name='username' className={styles.input} value={userData.username} onChange={handleChange} />
                        </div>
                        <div className={styles.itemInfo}>
                            <label htmlFor="email" className={styles.label} >Email: </label>
                            <input type="email" name='email' className={styles.input} value={userData.email} onChange={handleChange} />
                        </div>
                        <div className={styles.itemInfo}>
                            <label htmlFor="password" className={styles.label} >Password: </label>
                            <input type="password" name='password' className={styles.input} value={userData.password} onChange={handleChange} />
                        </div>
                        <button className={styles.submit}>Create Account</button>
                    </div>
                </form>
                <Link to="/" className={styles.home}>Home </Link>
            </div>
        </div>
    )
}

export default SignUp
