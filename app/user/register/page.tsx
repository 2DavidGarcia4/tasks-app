import styles from './register.module.css'
import RegisterForm from "../components/registerForm/RegisterForm";

export default function UserRegister() {
  return (
    <section className={styles.register}>
        <RegisterForm />
    </section>
  )
}