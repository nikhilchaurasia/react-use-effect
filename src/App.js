import "./App.css";
import React, { useContext } from "react";
import MainHeader from "./component/navigation/Header";
import LoginForm from "./component/Login/LoginForm";
import Home from "./component/home/Home";
import AuthContext from "./store/authContext";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment value={{ isLoggedIn: ctx.isLoggedIn, onLogout: ctx.onLogout }}>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <LoginForm />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
