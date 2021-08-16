import React, { useState, useEffect } from "react";
import "./Register.scss";
import { Link, useHistory } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import validator from "validator";
import firebase from "firebase";

function Register() {
  // States

  const [nameObject, setNameObject] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [minCharCountPassword] = useState(6);

  // Validity states
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [repeatedPasswordValid, setRepeatedPasswordValid] = useState(false);

  // Error messages states
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [repeatedPasswordErrorMessage, setRepeatedPasswordErrorMessage] =
    useState("");

  // Variables

  const history = useHistory();

  // Functions

  // Make string name from object
  useEffect(() => {
    setName(`${nameObject["First Name"]} ${nameObject["Last Name"]}`);

    setNameValid(Object.keys(nameObject).length === 2);
    if (nameValid) {
      Object.values(nameObject).forEach((val) => {
        if (val === "") setNameValid(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameObject]);

  // Validate email
  useEffect(() => {
    setEmailValid(validator.isEmail(email));
  }, [email]);

  // Validate password
  useEffect(() => {
    setPasswordValid(password.length >= minCharCountPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // Validate repeated password
  useEffect(() => {
    setRepeatedPasswordValid(repeatedPassword === password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatedPassword]);

  const handleRegister = (e) => {
    if (!nameValid || !emailValid || !passwordValid || !repeatedPasswordValid) {
      setNameErrorMessage(
        !nameValid ? "First and last name are required!" : ""
      );
      setEmailErrorMessage(!emailValid ? "Invalid Email!" : "");
      setPasswordErrorMessage(
        !passwordValid ? "Password has to be atleast 6 characters long!" : ""
      );
      setRepeatedPasswordErrorMessage(
        !repeatedPasswordValid ? "Passwords have to match!" : ""
      );
    } else {
      var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );

      firebase
        .auth()
        .currentUser.linkWithCredential(credential)
        .then((user) => {
          console.log("Succesfully merged!");
          history.push("/");
          return user.user.updateProfile({
            displayName: name,
          });
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="register">
      <h1>Create Your Account</h1>
      <div className="register__container">
        <CustomInput
          names={["First Name", "Last Name"]}
          parentCallback={(data) => setNameObject({ ...nameObject, ...data })}
        />
        <p className="register__error">{nameErrorMessage}</p>

        <CustomInput
          names={"Email"}
          parentCallback={(data) => setEmail(data["Email"])}
        />
        <p className="register__error">{emailErrorMessage}</p>

        <CustomInput
          names={"Password"}
          parentCallback={(data) => setPassword(data["Password"])}
        />
        <p className="register__error">{passwordErrorMessage}</p>

        <CustomInput
          names={"Repeat Password"}
          parentCallback={(data) =>
            setRepeatedPassword(data["Repeat Password"])
          }
        />
        <p className="register__error">{repeatedPasswordErrorMessage}</p>

        <button type="submit" onClick={handleRegister}>
          Register
        </button>
        <Link to="/login">Have an account?</Link>
      </div>
    </div>
  );
}

export default Register;
