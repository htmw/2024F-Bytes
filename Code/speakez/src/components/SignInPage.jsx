import React, { useState } from 'react';
import './SignInPage.css'; // Importing the CSS file for styling

// Creating the SignInPage component
const SignInPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="sign-in-page">
      <div className="form-container">

      {/* Displaying form title based on whether it's Sign In or Sign Up */}
        <h1 className="form-title">{isSignIn ? "Sign In" : "Sign Up"}</h1>
        
        {/* Form element for user input */}
        <form className="form">
          <div className="form-group">

          {/* Input for email with a label */}
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" className="input-field" required />
          </div>

          <div className="form-group">
          {/* Input for password with a label */}
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" className="input-field" required />
          </div>

          {/* If the user is on the Sign Up page, show the Confirm Password field */}
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="confirmPassword" className="input-field" required />
            </div>
          )}

         {/* Submit button with text that changes depending on Sign In or Sign Up */}
          <button type="submit" className="submit-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Button to toggle between Sign In and Sign Up views */}
        <button onClick={() => setIsSignIn(!isSignIn)} className="switch-btn">
          {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;

