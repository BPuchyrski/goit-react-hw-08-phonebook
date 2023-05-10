import {  useState } from "react"
import { useUser } from "components/context/userContext"


const Contacts = () => {
const { user, logout, islogged} = useUser()

 const [acces] = useState(islogged)
 

    return (
        <div>
        {acces ? <button onClick={logout}>Logout</button> : <p>no Acces</p> }
        <h1>hello {user.name}</h1>
        </div>
    )
}

export default Contacts