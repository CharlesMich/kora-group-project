import React from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginForm from "../LoginForm";
import DemoUser from "./Demouser";
import koralogo from '../../assets/kora-01.png'
import "./authPage.css"


function AuthPage() {

  return (
  <>
    <img src={koralogo} id='logo' alt='logo' />
    <div className="auth-container"> 
        <div className="auth-container-section signupform-container">
          <DemoUser 
              itemText="Log in as Demo User"
              />
          <OpenModalButton
                buttonText="Sign Up"
                className="signup-btn"
                modalComponent={<SignupFormModal />}
              />
        </div>
        <div className="auth-container-section loginform-container">
          <h1 className="login-title">Log In</h1>
          <LoginForm />
        </div>
    </div>
  </>
  );
}

export default AuthPage;
