import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [userData,setUserData] = React.useState({
        username: "",
        email: "", 
        password: "",
        confirmPassword:""
    });
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
        if(userData.password === userData.confirmPassword){
            const fetchParams = {method:'POST', headers:{"Content-Type":"application/json"},body:JSON.stringify(userData)}
            fetch("/api/user/create",fetchParams)
            .then(res => res.json())
            .then(data=> data.message === "success" && navigate("/"))
            .catch(error => console.error("Error creating user",error))
        }
        else{
            alert("Passwords Do not match!")
        }
        setUserData({
            username: "",
            email: "", 
            password: "",
            confirmPassword:""
        })
    }

    return (
        <div>
            <h1>Create Account</h1>
            <form className="sign-in-holder create-account" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                 <input type="text" name='username' value={userData.username} onChange={handleChange} />
                <label htmlFor="email">Email: </label>
                 <input type="email" name='email' value={userData.email} onChange={handleChange} />
                <label htmlFor="password">Password: </label>
                 <input type="password" name='password' value={userData.password} onChange={handleChange} />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                 <input type="password" name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} />
                <button>Create Account</button>
            </form>
        </div>
  )
}

export default SignUp