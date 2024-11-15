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
    <header className="bg-indigo-300 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 relative">
        <div className="flex items-center">
          <Link to={"/"}>
            <img src="/images/logo.png" alt="My Cart Logo" className="h-10" />
          </Link>
        </div>
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src="/images/menu.png" alt="Menu Icon" className="w-6 h-6" />
        </button>
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4 absolute md:relative top-full left-0 w-full md:w-auto bg-indigo-300 md:bg-transparent shadow-md md:shadow-none`}
        >
          {isLoggedIn && (
            <li>
              <Link
                to={"/login"}
                className="hover:text-gray-300 block py-2 px-4"
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <span className="block py-2 px-4">Hello {firstName}</span>
              </li>
              <li>
                <Link
                  to={"/orders"}
                  className="hover:text-gray-300 block py-2 px-4"
                >
                  My Translations
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="hover:text-gray-300 block py-2 px-4 cursor-pointer"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
