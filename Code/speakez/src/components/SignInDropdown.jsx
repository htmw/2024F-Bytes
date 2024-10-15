import React, { useState } from 'react';

const SignInDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    console.log('Toggle dropdown called');
    setIsOpen(!isOpen);
  };

  return (
    <div className="right-menu">
      <button onClick={toggleDropdown} className="sign-in-button">
        Sign In
      </button>
      {isOpen && (
        <div id="signInDropdown" className="sign-in-dropdown">
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Sign In</button>
            <a href="#">Forgot password?</a>
            <p>
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInDropdown;
