import {  useState } from "react"
import { useUser } from "components/context/userContext"


const Contacts = () => {
const {token, user, logout, islogged} = useUser()

//  const [acces, setacces] = useState(!islogged)
 console.log(`${token} to jest token`)
 console.log(islogged)

    return (
        <div>
        {acces ? <button onClick={logout}>Logout</button> : <p>Not logged in</p> }
        <h1 onClick={() => setacces((prev) => !prev)} >hello {user.name}</h1>
        </div>
    )
}

export default Contacts