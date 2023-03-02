import styles from './login.module.css'

import LoginForm from "../components/loginForm/LoginForm";

export default function UserLogin() {

  return (
    <section className={styles.login} >
      <LoginForm />
    </section>
  )
}