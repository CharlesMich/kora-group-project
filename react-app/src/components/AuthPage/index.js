import React from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginForm from "../LoginForm";
import DemoUser from "./Demouser";
import koralogo from '../../assets/kora-01.png'
import "./authPage.css"


function AuthPage() {

  return (
    <div className="auth-main">
      <img className="auth-kora-logo" src={koralogo} id='logo' alt='logo' />
      <p className="auth-slogan">A platform for exchanging knowledge and gaining a deeper insight into the world</p>
      <div className="auth-container">
        <div className="auth-container-section signupform-container">
          <p className="auth-terms">By continuing you indicate that you agree to Koras’s Terms of Service and Privacy Policy.</p>
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
    </div>
  );
}

export default AuthPage;
