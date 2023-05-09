import {  useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <div>
            <h1>Welcome to Phonebook</h1>
            <button onClick={handleLogin} >LogIn</button>
            <button onClick={handleRegister} >Register</button>
        </div>
    )
}

export default Home