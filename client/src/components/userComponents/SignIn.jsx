import React from 'react'
import Navbar from '../generalComponents/Navbar';
import styles from "../../styles/userStyles/sign-in-style.module.css"
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const [userData,setUserData] = React.useState({
        username: "", 
        password: ""
    })
    const navigate = useNavigate();

    function handleChange(e){
        const {name,value} = e.target;
        setUserData(prevUserData => {
            return {...prevUserData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const fetchParams = {
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
        }

        fetch("/api/user/login", fetchParams)
        .then(res => res.json())
        .then(data => data.message === "success" && navigate("/"))
        .catch(error => console.error(`there was an error signing in ${error}`))

        
    }

    return (
        <div>
            <div className={styles.body}>
                <div className={styles.image}></div>
                <div className={styles.info}>
                    <h1 className={styles.title}>Website Name</h1>
                    <form className={styles.sign_in_holder} onSubmit={handleSubmit}>
                    <h1 className={styles.signIn}>Sign In</h1>
                    <div className={styles.inputItems}>
                        <div className={styles.inputElement}>
                            <label htmlFor="username" className={styles.labels}>username: </label>
                            <input type="text" name='username' className={styles.input} value={userData.username} onChange={handleChange} />
                        </div>
                        <div className={styles.inputElement}>
                            <label htmlFor="password" className={styles.labels}>Password: </label>
                            <input type="password" name='password' className={styles.input} value={userData.password} onChange={handleChange} />
                        </div>
                        <button className={styles.submit}>Sign In!</button>
                    </div>
                    </form>
                    <Link to={"/"} className={styles.home}>Home</Link>
                </div>
            </div>
        </div>
  )
}

export default SignIn
