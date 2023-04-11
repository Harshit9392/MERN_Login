import React, { useState } from "react";
import SignUp from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signup, signupGoogle } from "../../redux/actions/auth";

const InitState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sForm, setsForm] = useState(InitState);

  const handleChange = (e) =>
    setsForm({
      ...sForm,
      [e.target.name]: e.target.value,
    });

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signupGoogle(accessToken, navigate));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (
      sForm.firstName !== "" &&
      sForm.lastName !== "" &&
      sForm.password !== "" &&
      sForm.confirmPassword !== "" &&
      sForm.email !== "" &&
      sForm.password === sForm.confirmPassword &&
      sForm.password.length >= 8 &&
      passwordRegex.test(sForm.password)
    ) {
      dispatch(signup(sForm, navigate));
    }
    else(
        alert("All fields required. Password must be in the form of (A-z 0-9 !@#$%&) with min 8 characters.")
    )
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  return (
    <div className={SignUp.loginContainer}>
      <div className={SignUp.loginContainerv2}>
        <h1>Create your account</h1>

        <div className={SignUp.inputContainer}>
          <label>FIRST NAME</label>
          <input
            onChange={handleChange}
            name="firstName"
            placeholder="enter your first name"
            type="text"
          />
        </div>
        <div className={SignUp.inputContainer}>
          <label>LAST NAME</label>
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="enter your last name"
            type="text"
          />
        </div>
        <div className={SignUp.inputContainer}>
          <label>EMAIL</label>
          <input
            name="email"
            onChange={handleChange}
            placeholder="enter your email"
            type="email"
          />
        </div>

        <div className={SignUp.inputContainer}>
          <label>PASSWORD</label>
          <input
            name="password"
            onChange={handleChange}
            placeholder="enter your password (must contain at least 1 number and 1 special character)"
            type="password"
          />
        </div>

        {/* <div className={SignUp.inputContainer}>
          <label>CONFIRM PASSWORD</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="retype your password"
            type="password"
          />
        </div> */}

        <div className={SignUp.footerContainer}>
          <div>
            Already Signed Up? <Link to="/account/login">Login</Link>
          </div>
          <div>
            <Link to="/account/forgotpassword">Forgot Password?</Link>
          </div>
        </div>

        <button onClick={handleOnSubmit} className={SignUp.loginBTN}>
          REGISTER
        </button>
        <span className={SignUp.or}>or</span>
        <button onClick={() => login()} className={SignUp.googleBTN}>
          

           <i class="fa-brands fa-google"></i>  Sign up with google</button>

                 
            </div>

        </div>
    )
}

export default Signup;