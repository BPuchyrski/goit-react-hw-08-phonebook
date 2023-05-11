import { useNavigate } from 'react-router-dom';
import css from './Login.module.css';
import { useUser } from 'components/context/userContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const navigateToRegister = () => {
    navigate('/register');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.target.password.value;
    // console.log(JSON.stringify({email: email, password: password}))

    login({
      email: email,
      password: password,
    });
  };

  return (
    <>
      <div data-aos="fade-up" className={css.layout}>
        <h1 data-aos="fade-up" className={css.title}>
          Login
        </h1>
        <form onSubmit={handleSubmit} className={css.form}>
          <ul className={css.list}>
            <li className={css.item}>
              <label htmlFor="email">Email</label>
            </li>
            <li className={css.item}>
              <input className={css.input} type="email" id="email" />
            </li>
            <li className={css.item}>
              <label htmlFor="password">Password</label>
            </li>
            <li className={css.item}>
              <input className={css.input} type="password" id="password" />
            </li>
            <li className={css.btnItem}>
              <button className={css.btn} type="submit">
                Login
              </button>
            </li>
          </ul>
        </form>
        <p className={css.text}>If you don't have acc create it here </p>
        <p className={css.register} onClick={navigateToRegister}>
          Sign up
        </p>
      </div>
    </>
  );
};

export default Login;
