import styles from "./LoginFrom.module.css";
import { useEffect, useState, useReducer } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const usernameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.value, isValid: action.value.length > 3}
    }
    if (action.type === 'ON_BLUR') {
        return {value: state.value, isValid: state.value.length > 3}
    }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.value, isValid: action.value.length > 7}
    }
    if (action.type === 'ON_BLUR') {
        return {value: state.value, isValid: state.value.length > 7}
    }
    return { value: '', isValid: false };
};

const LoginForm = (props) => {
  const [isValidForm, setValidForm] = useState(false);
  const [usernameState, dispatchEmail] = useReducer(usernameReducer, {value: '', isValid: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});

  const {isValid: usernameIsvalid} = usernameState
  const {isValid: passswordIsvalid} = passwordState

  useEffect(() => {
    const timeoutIdentifier = setTimeout(() => {
      console.log("Use effect called");
      setValidForm(usernameState.value.trim().length > 3 && passwordState.value.trim().length > 7);
    }, 500);
    return () => {
      console.log("Cleanup called");
      clearTimeout(timeoutIdentifier);
    };
  }, [usernameIsvalid, passswordIsvalid]);

  const usernameChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", value : event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_INPUT", value : event.target.value})
  };

  const loginhandler = () => {
    props.onLogin(usernameState.value, passwordState.value);
  };

  const validUsernameHandler = () => {
    dispatchEmail({type: "ON_BLUR"})
  };

  const validPasswordHandler = () => {
    dispatchEmail({type: "ON_BLUR"})
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={loginhandler}>
        <div
          className={`${styles.control} ${
            usernameState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
            value={usernameState.value}
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            onBlur={validUsernameHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={passwordState.value}
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
