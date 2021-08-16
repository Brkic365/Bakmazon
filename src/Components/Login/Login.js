import React, { useState } from "react";
import "./Login.scss";
import Custominput from "../CustomInput/CustomInput";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import firebase from "firebase";

function Login() {
  // States

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage] = useState("");
  const [passwordErrorMessage] = useState("");
  const [remember, setRemember] = useState(false);

  // Variables

  const history = useHistory();

  // Functionss

  const handleLogin = (e) => {
    let persistance = remember
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    auth
      .setPersistence(persistance)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => history.push("/"))
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__login">
        <h1>Login</h1>
        <div className="login__login-container">
          <p>
            If you already have an account, you can login here using your
            credentials.
          </p>

          <Custominput
            names="email"
            parentCallback={(data) => setEmail(data["email"])}
          />
          <p className="login__login-error">{emailErrorMessage}</p>
          <Custominput
            names="password"
            parentCallback={(data) => setPassword(data["password"])}
          />
          <p className="login__login-error">{passwordErrorMessage}</p>

          <div className="login__login-remember">
            <input
              type="checkbox"
              id="remember-check"
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-check">Remember me</label>
          </div>
          <div className="login__login-cta-and-links">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <div className="login__login-links">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/register">Don't have an account?</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="login__register">
        <h1>Register</h1>
        <div className="login__register-container">
          <p>
            Creating an account has many benefits: email notifications, faster
            orders, order history and collecting coupons.
          </p>
          <Link to="/register">
            <button type="submit">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
