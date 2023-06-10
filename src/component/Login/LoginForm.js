import styles from "./LoginFrom.module.css";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [isvalidUsername, setIsValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidForm, setValidForm] = useState(false);

  useEffect(() => {
    const timeoutIdentifier = setTimeout(() => {
      console.log("Use effect called");
      setValidForm(username.trim().length > 3 && password.trim().length > 7);
    }, 500);
    return () => {
        console.log("Cleanup called");
        clearTimeout(timeoutIdentifier)
    }
  }, [username, password]);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginhandler = () => {
    props.onLogin(username, password);
  };

  const validUsernameHandler = () => {
    setIsValidUsername(username.trim().length > 3);
  };

  const validPasswordHandler = () => {
    setValidPassword(password.trim().length > 7);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={loginhandler}>
        <div
          className={`${styles.control} ${
            isvalidUsername === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            value={username}
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            onBlur={validUsernameHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            isValidPassword === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={passwordChangeHandler}
            onBlur={validPasswordHandler}
          />
        </div>
        <div className={styles["control"]}>
          <Button type="submit" disabled={!isValidForm}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
