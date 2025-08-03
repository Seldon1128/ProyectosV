import { useState } from "react";
import { RiCurrencyLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../assets/avatar.png";
import useStore from "../store";

const links = [
  { label: "Dashboard", to: "/overview" },
  { label: "Transactions", to: "/transactions" },
  { label: "Accounts", to: "/account" },
  { label: "Settings", to: "/settings" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setCredentials, user } = useStore((state) => state);

  const signOut = () => {
    localStorage.removeItem("user");
    setCredentials(null);
    window.location.reload();
  };

  return (
    <div className="w-full flex items-center justify-between py-4 px-4 md:px-10 bg-gray-100 dark:bg-slate-900 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl">
          <RiCurrencyLine className="text-white text-3xl" />
        </div>
        <span className="text-xl font-bold text-black dark:text-white">
          My-Finance
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          className="text-gray-700 dark:text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-6 py-2 rounded-full ${
              location.pathname === link.to
                ? "bg-black text-white"
                : "text-gray-700 dark:text-gray-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Profile */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src={Avatar}
            alt="User"
            className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
          />
          <MdOutlineKeyboardArrowDown className="text-2xl text-gray-700 dark:text-gray-300" />
        </div>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border rounded-md shadow-lg p-4 space-y-1 text-sm">
            <p className="font-medium text-black dark:text-gray-300">{user?.firstname}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{user?.email}</p>
            <p
                onClick={signOut}
                className="text-violet-600 font-medium cursor-pointer hover:underline pt-2"
            >
                Sign Out
            </p>

          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-slate-900 shadow-md flex flex-col items-center py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`py-2 ${
                location.pathname === link.to
                  ? "font-bold text-black dark:text-white"
                  : "text-gray-700 dark:text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

