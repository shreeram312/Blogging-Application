import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { Menu, Search, User } from "react-feather"; // Additional icons

export const Appbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="border-b flex justify-between items-center px-4 py-4 sm:px-10 sm:py-4 bg-gray-800 text-white shadow-md relative">
      <div className="flex items-center">
        <Link
          to={"/blogs"}
          className="font-semibold text-2xl sm:text-4xl cursor-pointer hover:text-gray-300"
        >
          Medium
        </Link>
        <button
          className="sm:hidden ml-4 text-white hover:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="hidden sm:flex items-center text-gray-300 hover:text-gray-100"
        >
          <Search size={20} />
        </button>
        <Link to={`/publish`}>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            New
          </button>
        </Link>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center text-white focus:outline-none"
          >
            <Avatar size={"big"} name="Shreeram" />
            <User size={20} className="ml-2 text-gray-300" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 shadow-lg rounded-lg z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
              >
                Profile
              </Link>
              <Link
                to="/signin"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-gray-800 text-white shadow-md transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex justify-end p-4">
          <button className="text-white" onClick={() => setMenuOpen(false)}>
            <Menu size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to={`/publish`}
            className="text-gray-300 px-4 py-2 hover:bg-gray-600"
          >
            New
          </Link>
          <Link
            to="/profile"
            className="text-gray-300 px-4 py-2 hover:bg-gray-600"
          >
            Profile
          </Link>
          <Link
            onClick={() => {
              localStorage.removeItem("token");
            }}
            to="/signin"
            className="text-gray-300 px-4 py-2 hover:bg-gray-600"
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};
