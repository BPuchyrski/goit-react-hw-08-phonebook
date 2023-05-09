import axios from "axios";
import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState, useEffect } = require("react");
const UserContext = createContext()

export const useUser = () => useContext(UserContext)
export const UserProvider = ({children}) => {

    // axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'
    const [user, setUser] = useState({name: null, email:null})
    const [token, setToken] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    
   
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
          navigate("/contacts");
        }
      }, [isLogged]);

    const setAuthHeader = (token) => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    const clearAuthHeader = () => {
        axios.defaults.headers.common.Authorization = ''
    }

    

    const register = async (credentials) => {
        try {
            const response = await axios.post('https://connections-api.herokuapp.com/users/signup', credentials)
            setAuthHeader(response.data.token)
            setUser({ name: response.data.user.name, email: response.data.user.email })
            setToken(response.data.token)
            setIsLogged(true)
           
           
        } catch (error) {
            console.log(error)
            
        }
    }
    
    const login = async (credentials) => {
        try {
            const response = await axios.post('https://connections-api.herokuapp.com/users/login', credentials)
            setAuthHeader(response.data.token)
            setUser({ name: response.data.user.name, email: response.data.user.email })
            setToken(response.data.token)
            setIsLogged(true)
        } catch (error) {
            console.log(error)
        }


    }

    const logout = async () => {

        try {
            await axios.post('https://connections-api.herokuapp.com/users/logout', token)
            clearAuthHeader()
            setUser({name: null, email: null})
            setToken(null)
            setIsLogged(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        }

    
    }

    
    return (
        <UserContext.Provider value={{user, token, isLogged, isRefreshing, clearAuthHeader, register, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}