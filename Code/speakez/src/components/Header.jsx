import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
        localStorage.removeItem("loggedEmail");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = localStorage.getItem("loggedEmail") || true;
  const firstName = localStorage.getItem("firstName") || "Team";

  return (
    <header className="bg-indigo-300 text-white shadow-md relative">
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
          } md:flex md:items-center md:space-x-4 w-full md:w-auto bg-indigo-300 md:bg-transparent mt-4 md:mt-0 transition-all duration-300`}
        >
          {isLoggedIn && (
            <>
              <li>
                <span className="block py-2 px-4 md:text-left">
                  Hello {firstName}
                </span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 block py-2 px-4  md:text-left cursor-pointer "
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
                className="hover:text-gray-300 block py-2 px-4  md:text-left"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
