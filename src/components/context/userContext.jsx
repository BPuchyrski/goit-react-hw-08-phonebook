import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { createContext, useContext, useState, useEffect } = require('react');
const UserContext = createContext();

export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  // axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'
  const [user, setUser] = useState({ name: null, email: null });
  const [token, setToken] = useState(null);
  const [zalogowany, setZalogowany] = useState(false);
  const [isRefreshing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      const parsedToken = JSON.parse(localToken);
      const localUser = localStorage.getItem('user');
      const parsedUser = JSON.parse(localUser);
      const localEmail = localStorage.getItem('email');
      const parsedEmail = JSON.parse(localEmail);
      setUser({ name: parsedUser, email: parsedEmail });
      setToken(parsedToken);
      setAuthHeader(parsedToken);
      setZalogowany(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (zalogowany) {
        console.log('jestem zalogowany' + zalogowany);
        navigate('/contacts');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zalogowany]
  );

  const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
  };

  const register = async credentials => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        credentials
      );
      setAuthHeader(response.data.token);
      setUser({
        name: response.data.user.name,
        email: response.data.user.email,
      });
      setToken(response.data.token);
      alert('account created');
    } catch (error) {
      console.log(error);
    }
  };

  const login = async credentials => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        credentials
      );
      setAuthHeader(response.data.token);
      setUser({
        name: response.data.user.name,
        email: response.data.user.email,
      });
      setToken(response.data.token);
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user.name));
      localStorage.setItem('email', JSON.stringify(response.data.user.email));
      setZalogowany(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'https://connections-api.herokuapp.com/users/logout',
        token
      );
      clearAuthHeader();
      setUser({ name: null, email: null });
      setToken(null);
      setZalogowany(false);
      navigate('/');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  };

  // const refresh = async () => {
  //     try {
  //         const response = await axios.get('https://connections-api.herokuapp.com/users/current')
  //         setUser({ name: response.data.user.name, email: response.data.user.email })
  //         setToken(response.data.token)
  //         setIsLogged(true)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setToken,
        zalogowany,
        isRefreshing,
        clearAuthHeader,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
