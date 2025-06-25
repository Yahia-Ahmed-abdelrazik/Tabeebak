import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets.js";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

function Navbar() {
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      /> */}
      <p className="w-fit cursor-pointer font-extrabold text-3xl text-primary tracking-wide hover:text-blue-800 transition duration-300">
        Tabeebak
        <span className="text-gray-500 text-sm align-top ml-1">®</span>
      </p>

      {/*  */}
      <ul className="hidden md:flex items-start font-medium gap-5">
        <NavLink to="/">
          <li className="py-1 ">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 ">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 ">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 ">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      {/*  */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-4 cursor-pointer group relative">
            <img src={userData.image} className="w-8 rounded-full" alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  my Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  my Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        <img
          src={assets.menu_icon}
          className="w-6 cursor-pointer md:hidden"
          alt="menu_icon"
          onClick={() => setShowMenu(true)}
        />
        {/* {---------mobile menue} */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className={"px-4 py-2 rounded inline-block"}>Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <p className={"px-4 py-2 rounded inline-block"}>All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className={"px-4 py-2 rounded inline-block"}> About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className={"px-4 py-2 rounded inline-block"}> Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
