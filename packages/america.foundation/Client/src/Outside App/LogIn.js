import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Login.css";
import LoginFarm from "./Login/LoginFarm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/Investing");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="login">
      <div className="login_image_container">
        <div className="login_image_text">
          As it is written, 'You shall reap what you sow.'
        </div>
        <div className="login_image_text_space"></div>
        <div className="login_image">
          <LoginFarm />
        </div>
      </div>
      <div className="login_image_space"></div>
      <div className="login_container">
        <div className="login_dhaay_container">
          <div className="login_dhaay_space"></div>
          <Link className="login_dhaay" to="/SignUp">
            <div className="login_dhaay_text">Don't have an account yet?</div>
            <svg className="signup_ahaa_svg" viewBox="0 0 60 50">
              <path
                className="ahaa1"
                d="m29.16,46.95c-8.99,0-17.99.03-26.98-.06-.7,0-1.69-.65-2.01-1.27-.31-.6-.18-1.7.18-2.34,1.32-2.33,2.8-4.57,4.25-6.83,1.75-2.73,3.53-5.44,5.29-8.17,4.28-6.64,8.55-13.28,12.82-19.92,1.47-2.29,2.92-4.58,4.4-6.86,1.48-2.27,3.53-1.95,5.28.76,2.01,3.1,4.08,6.17,6.08,9.28,1.8,2.81,3.54,5.66,5.31,8.48.87,1.38,1.76,2.75,2.65,4.12,1.28,1.98,2.55,3.96,3.83,5.94,1.33,2.06,2.67,4.11,4,6.17,1.54,2.41,3.14,4.78,4.54,7.27.34.61.25,1.79-.13,2.39-.36.57-1.38.72-2.11,1.04-.1.04-.24-.02-.36-.02-9.01,0-18.02,0-27.03,0h0Zm26.41-5.13c-.09-.21-.23-.83-.56-1.33-7.5-11.57-15.02-23.13-22.54-34.69-1.43-2.2-4.46-2.22-5.89-.02-7.55,11.6-15.1,23.21-22.64,34.82-.81,1.25-.66,2.48.26,3.6.92,1.12,2.2,1.06,3.51,1.05,14.9-.02,29.81-.02,44.71-.02,1.83,0,3.14-1.26,3.15-3.42Z"
              />
              <path
                className="ahaa2"
                d="m55.57,41.82c0,2.16-1.32,3.42-3.15,3.42-14.9,0-29.81,0-44.71.02-1.31,0-2.59.07-3.51-1.05-.92-1.12-1.07-2.35-.26-3.6,7.54-11.61,15.09-23.22,22.64-34.82,1.43-2.2,4.46-2.18,5.89.02,7.52,11.56,15.04,23.12,22.54,34.69.33.5.47,1.12.56,1.33Zm-26.07,2h0c7.67-.01,15.35.02,23.02-.08.55,0,1.59-1.07,1.54-1.53-.11-.89-.8-1.73-1.32-2.55-1.71-2.68-3.44-5.35-5.17-8.02-5.29-8.14-10.58-16.29-15.89-24.42-1.51-2.32-2.83-2.3-4.34.02-3.58,5.52-7.15,11.05-10.74,16.56-3.82,5.87-7.67,11.73-11.46,17.63-.25.39-.26,1.15-.05,1.58.19.39.83.78,1.28.78,7.71.05,15.42.03,23.12.03Z"
              />
              <path
                className="ahaa3"
                d="m29.5,43.82c-7.71,0-15.42.01-23.12-.03-.44,0-1.09-.39-1.28-.78-.21-.43-.21-1.19.05-1.58,3.79-5.9,7.64-11.75,11.46-17.63,3.59-5.51,7.16-11.04,10.74-16.56,1.51-2.32,2.82-2.34,4.34-.02,5.31,8.13,10.6,16.28,15.89,24.42,1.73,2.67,3.46,5.33,5.17,8.02.52.82,1.21,1.66,1.32,2.55.06.47-.98,1.53-1.54,1.53-7.67.1-15.35.07-23.02.07h0Zm-.13-32.08c-.79.55-2.07.96-2.27,1.68-.47,1.62-.51,3.39-.53,5.1-.02,1.55.19,3.1.31,4.65.2,2.57.39,5.15.63,7.71.11,1.15.77,1.85,1.98,1.84,1.21,0,1.8-.77,1.91-1.86.28-2.65.54-5.3.72-7.95.17-2.56.25-5.12.33-7.68.07-2.03-.98-3.16-3.07-3.49Zm.02,27.61c2.2.01,3.18-1.03,3.19-3.37,0-1.07-1.36-2.26-2.59-2.26-2.4,0-3.47.77-3.48,2.5-.01,2.12.91,3.12,2.89,3.13Z"
              />
              <path
                className="ahaa4"
                d="m29.37,11.74c2.1.33,3.14,1.47,3.07,3.49-.09,2.56-.16,5.12-.33,7.68-.18,2.65-.44,5.3-.72,7.95-.12,1.09-.7,1.86-1.91,1.86-1.21,0-1.87-.69-1.98-1.84-.24-2.57-.43-5.14-.63-7.71-.12-1.55-.33-3.1-.31-4.65.03-1.71.06-3.48.53-5.1.21-.72,1.48-1.13,2.27-1.68Z"
              />
              <path
                className="ahaa5"
                d="m29.39,39.35c-1.98-.01-2.9-1.01-2.89-3.13,0-1.73,1.09-2.51,3.48-2.5,1.24,0,2.6,1.19,2.59,2.26,0,2.34-.99,3.38-3.19,3.37Z"
              />
            </svg>
          </Link>
        </div>
        <div className="login_holder2">
          <form className="login_holder" onSubmit={handleSubmit}>
            <div className="login_title">Log in to your account</div>
            <div className="login_email_container">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="login_email"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="login_password_container">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="login_password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="login_fp_container">
              <Link className="login_fp" to="/ForgotPassword">
                Forgot Password?
              </Link>
            </div>
            <div className="login_button_container">
              <button className="login_button">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
