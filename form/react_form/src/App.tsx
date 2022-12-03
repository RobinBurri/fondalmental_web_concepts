import * as React from 'react';
import SimpleInput from './components/SimpleInput';
import styles from './App.module.css';
function App() {
    return (
        <div className={styles.app}>
            <SimpleInput></SimpleInput>
        </div>
    );
}

export default App;
