import "./App.css";
import React from "react";
import MainHeader from "./component/navigation/Header";
import LoginForm from "./component/Login/LoginForm";
import Home from "./component/home/Home";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setLoggedIn] = useState();
  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInStorage === '1') {
      setLoggedIn(true);
    }
  }, []);

  const loginHandler = (username, password) => {
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenicated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <LoginForm onLogin={loginHandler} />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
