import styles from './RegisterForm.module.css'
import { useFormik } from 'formik'

const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            newsletter: false,
        },
    })

    console.log(formik.values)
    return (
        <header>
            <h1>Register</h1>
            <form className={styles.registration_form}>
                <label>
                    <span className={styles.label_text}>First Name</span>
                    <input
                        type='text'
                        name='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                    />
                </label>
                <label>
                    <span className={styles.label_text}>Last Name</span>
                    <input
                        type='text'
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                    />
                </label>
                <label>
                    <span className={styles.label_text}>Email</span>
                    <input
                        type='text'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </label>
                <label className='password'>
                    <span className={styles.label_text}>Password</span>
                    <input
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                </label>
                <label className={styles.checkbox}>
                    <input
                        type='checkbox'
                        name='newsletter'
                        value={formik.values.newsletter}
                        onChange={formik.handleChange}
                    />
                    <span>Sign me up for the weekly newsletter.</span>
                </label>
                <div className={styles.text_center}>
                    <button className={styles.submit} name='register'>
                        Sign Me Up
                    </button>
                </div>
            </form>
        </header>
    )
}

export default RegisterForm
