import Navigation from "./Navigation"
import styles from './Header.module.css'

const MainHeader = props => {
    return (
        <header className={styles['main-header']}>
            <h1>Food app</h1>
            <Navigation onLogout={props.onLogout}/>
        </header>
    )
}

export default MainHeader; 