import FormLogo from './FormLogo'
import styles from './FormSection.module.css'
import RegisterForm from './RegisterForm'

const Formsection = () => {
    return (
        <section className={styles.formSection}>
            <FormLogo></FormLogo>
            <RegisterForm></RegisterForm>
        </section>
    )
}

export default Formsection
