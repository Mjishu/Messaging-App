// import React from 'react'
import {Link} from "react-router-dom"

function Error() {
  return (
    <div>
        <h1>(404) It seems like you got lost!</h1>
        <Link to={"/"}>Go Home</Link>
    </div>
  )
}

export default Error