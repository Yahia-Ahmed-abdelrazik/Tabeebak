import { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navebar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-2 border-gray-100 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        {/* <img
          onClick={() => navigate("/")}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="logo"
        /> */}
        <p className="w-fit cursor-pointer font-extrabold text-3xl text-primary tracking-wide hover:text-blue-800 transition duration-300">
          Tabeebak
          <span className="text-gray-500 text-sm align-top ml-1">®</span>
        </p>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navebar;
