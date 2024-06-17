import React from 'react'
import Navbar from './components/generalComponents/Navbar'

function App() {
  const [backendUsers,setBackendUsers] = React.useState([])

  React.useEffect(()=>{
    fetch("/api/user/all")
    .then(res => res.json())
    .then(data => setBackendUsers(data))
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
    <div>
      <Navbar/>
      <h1>App</h1>
      
      {usersMapped}
    </div>
  )
}

export default App