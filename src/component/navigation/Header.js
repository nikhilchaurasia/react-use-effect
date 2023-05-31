import Navigation from "./Navigation"
import styles from './Header.module.css'

const MainHeader = props => {
    return (
        <header className={styles['main-header']}>
            <h1>Food app</h1>
            <Navigation isAuthenicated={props.isAuthenicated} onLogout={props.onLogout}/>
        </header>
    )
}

export default MainHeader; 