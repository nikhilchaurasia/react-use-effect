import styles from './Navigation.module.css'

const Navigation = props => {

    const logoutHandler = () => {
        props.onLogout();
    }

    return (
        <nav className={styles.nav}>
        <ul >
            {props.isAuthenicated && <li><a href='/'>User</a></li>}
            {props.isAuthenicated && <li><a href='/'>Admin</a></li>}
            {props.isAuthenicated && <li><button onClick={logoutHandler}>Logout</button></li>}
        </ul>
        </nav>
    )
}

export default Navigation;