import { assets } from "../assets/assets_frontend/assets";

function Header() {
  return (
    <div className="bg-primary  flex-col text-white flex md:flex-row flex-wrap rounded-lg  px-6 md:px-10 lg:px-20 ">
      {/* ------left Side */}
      <div className="w-full md:w-1/2  flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ">
          Book Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="group File" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 px-8 py-3 rounded-full text-gray-600 bg-white text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 "
        >
          Book Appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* ------Right Side  */}
      <div className=" w-full relative   md:w-1/2">
        <img
          className="md:absolute bottom-0 h-auto w-full"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
