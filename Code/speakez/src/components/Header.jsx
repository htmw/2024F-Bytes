import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Destructure theme state and toggle function

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedEmail");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("loggedEmail");

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-indigo-300"
      } text-white shadow-md relative`}
    >
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4">
        <div className="flex items-center w-full md:w-auto justify-between">
          <Link to={"/"}>
            <img src="/images/logo.png" alt="My Cart Logo" className="h-10" />
          </Link>

          <button
            className="block md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <img src="/images/menu.png" alt="Menu Icon" className="w-6 h-6" />
          </button>
        </div>

        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4 w-full md:w-auto ${
            isDarkMode ? "bg-gray-800" : "bg-indigo-300"
          } md:bg-transparent mt-4 md:mt-0 transition-all duration-300`}
        >
          {isLoggedIn && (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 block py-2 px-4 md:text-left cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <Link
                to={"/login"}
                className="hover:text-gray-300 block py-2 px-4 md:text-left"
              >
                Login
              </Link>
            </li>
          )}
          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={toggleTheme}
              className="hover:text-gray-300 block py-2 px-4 cursor-pointer"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
