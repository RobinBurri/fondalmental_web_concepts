import * as React from 'react';
import { useState } from 'react';

import styles from './SimpleInput.module.css';
const SimpleInput = () => {
    const [enteredName, setEnteredName] = useState('');
    const [errorIsShown, setErrorIsShown] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const nameInputChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEnteredName(event.target.value);
        if (enteredName.length > 3 && errorIsShown) {
            setErrorIsShown(false);
        }
    };

    const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (enteredName.length < 4) {
            setErrorMsg('Name is too short. 4 character min.');
            setErrorIsShown(true);
        }
    };
    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={styles['form-control']}>
                <label htmlFor='name'>Your Name</label>
                <input
                    type='text'
                    id='name'
                    value={enteredName}
                    onChange={nameInputChangeHandler}
                />
                {errorIsShown && <p className={styles.errmsg}>{errorMsg}</p>}
            </div>
            <div className={styles['form-action']}>
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
