import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginStyles from "./Login.module.css"
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signinGoogle, signin } from "../../redux/actions/auth";


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(signinGoogle(accessToken, navigate))
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    function handleSubmit(e) {
        e.preventDefault();
        if (email !== "" && password !== "") {
            dispatch(signin({ email, password }, navigate))
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setErrorMessage("Invalid email or password");
                }
            })
        } else {
            alert("Please enter your email and password");
        }
    }

    return (
        <div className={LoginStyles.loginContainer}>
            <div className={LoginStyles.loginContainerv2}>
                <h1>LOGIN</h1>

                <div className={LoginStyles.inputContainer}>
                    <label>EMAIL</label>
                    <input onChange={e => setEmail(e.target.value)} placeholder="enter your email" type="email" required />
                </div>

                <div className={LoginStyles.inputContainer}>
                    <label>PASSWORD</label>
                    <input onChange={e => setPassword(e.target.value)} placeholder="enter your password" type="password" required />
                </div>

                <div className={LoginStyles.forgetmeContainer}>
                    {/* <div>
                        Remember Me <input type="checkbox" />
                    </div> */}
                    <div>
                        <Link to="/account/forgotpassword">Forgot password?</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <button className={LoginStyles.loginBTN}>LOGIN</button>
                </form>

                {errorMessage && (
                    <div className={LoginStyles.errorMessage}>
                        {errorMessage}
                    </div>
                )}

                <span className={LoginStyles.or}>or</span>
                <button onClick={() => login()} className={LoginStyles.googleBTN}>
                    <i class="fa-brands fa-google"></i>  Sign in with google
                </button>

                <span className={LoginStyles.notreg}>
                    Not registered yet?{" "}
                    <Link className={LoginStyles.signupBTN} to="/account/signup">
                        Signup
                    </Link>
                </span>

            </div>
        </div>
    )
}

export default Login;

