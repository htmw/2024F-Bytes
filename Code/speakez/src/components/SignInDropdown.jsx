import React from "react";
import { useNavigate } from "react-router-dom";

const SignInDropdown = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin"); // Navigates to the SignInPage component
  };

  return (
    <div className="right-menu">
      <button onClick={handleSignInClick} className="sign-in-button">
        Sign In
      </button>
    </div>
  );
};

export default SignInDropdown;
