
import { useNavigate } from 'react-router-dom';
import css from './Register.module.css'
import { useUser } from 'components/context/userContext';
const Register = () => {

    const {register} = useUser()

   
    const handleSubmit =  (e) => {
        e.preventDefault()
        const name = e.currentTarget.elements.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(JSON.stringify({name: name, email: email, password: password}))
        
         register({
            name: name,
            email: email,
            password: password
        })
        
    }

    const navigate = useNavigate()

    const navigateToLogin = () => {
        navigate('/login')
    }

    return (
        <>
        <div className={css.layout}>
            <h1 className={css.title} >Register</h1>
            <form onSubmit={handleSubmit} className={css.form}>
            <ul className={css.list}>
            <li className={css.item} >
                    <label htmlFor="name">Name</label>
                </li>
                <li className={css.item} >
                    <input className={css.input} type='text' id="name" />
                </li>
                <li className={css.item} >
                    <label htmlFor="email">Email</label>
                </li>
                <li className={css.item} >
                    <input className={css.input} type="email" id="email" />
                </li>
                <li className={css.item} >
                    <label htmlFor="password">Password</label>
                </li>
                <li className={css.item} >
                    <input className={css.input} type="password" id="password" />
                </li>
                <li className={css.btnItem} >
                    <button className={css.btn}  type="submit">Sign Up</button>
                </li>

            </ul>
            </form>
            <p className={css.text}>If you already got acc</p>
            <p className={css.register} onClick={navigateToLogin}>Log In</p>
        </div>
        </>
    )
}

export default Register