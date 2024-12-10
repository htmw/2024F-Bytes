import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginComponent from "./components/LoginComponent";
import SignInPage from "./components/SignInPage";
import HomeComponent from "./components/HomeComponent";
import { ThemeProvider } from "./components/ThemeContext"; // Import ThemeProvider

import "./index.css";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <ThemeProvider> {/* Wrap your app with ThemeProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
