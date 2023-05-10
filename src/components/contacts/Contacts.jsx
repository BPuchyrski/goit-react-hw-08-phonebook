import {  useState } from "react"
import { useUser } from "components/context/userContext"


const Contacts = () => {
const {token, user, logout, islogged} = useUser()

 const [acces] = useState(!islogged)
 console.log(`${token} to jest token`)
 console.log(islogged)

    return (
        <div>
        {acces ? <button onClick={logout}>Logout</button> : <p>no Acces</p> }
        <h1>hello {user.name}</h1>
        </div>
    )
}

export default Contacts