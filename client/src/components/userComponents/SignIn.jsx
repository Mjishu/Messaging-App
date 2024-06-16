import React from 'react'

function SignIn() {
    const [userData,setUserData] = React.useState({
        username: "", 
        password: ""
    })

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
        console.log(userData)
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form className="sign-in-holder" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" name='username' value={userData.username} onChange={handleChange} />
                <label htmlFor="password">Password: </label>
                <input type="password" name='password' value={userData.password} onChange={handleChange} />
                <button>Sign In!</button>
            </form>
        </div>
  )
}

export default SignIn