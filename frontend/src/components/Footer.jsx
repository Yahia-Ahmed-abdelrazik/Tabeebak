// import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          {/* <img className="mb-5 w-40" src={assets.logo} alt="" /> */}
          <p className="w-fit cursor-pointer font-extrabold text-3xl text-primary tracking-wide hover:text-blue-800 transition duration-300">
            Tabeebak
            <span className="text-gray-500 text-sm align-top ml-1">®</span>
          </p>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              {" "}
              <Link className="hover:text-primary" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="hover:text-primary" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/Privacy-policy">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
        {/* right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-primary cursor-pointer">
              +1-222-444-5555
            </li>
            <li className="hover:text-primary cursor-pointer">
              yahiaahmedyahia2003@gmail.com
            </li>
          </ul>
        </div>
      </div>
      {/* Copy Right */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ Tabeebak - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
