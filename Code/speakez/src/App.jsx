import React, { useState, useEffect, useRef } from "react";
// NEW -Importing React Router tools to set up page navigation and handle routes in the app.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginComponent from "./components/LoginComponent";
import "./index.css";

import SignInPage from "./components/SignInPage";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignInPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
