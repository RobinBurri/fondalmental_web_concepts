import * as React from 'react'
import styles from './App.module.css'
import Formsection from './components/Form/FormSection'
import Card from './components/UI/Card'
function App() {
    return (
        <div className={styles.app}>
            <Card>
                <Formsection></Formsection>
            </Card>
        </div>
    )
}

export default App
