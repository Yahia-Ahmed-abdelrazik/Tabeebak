import { assets } from "../assets/assets_frontend/assets";

function About() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="flex flex-col my-10 md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} />
        <div className="flex flex-col justify-center gap-6  md:w-1/2 text-sm text-gray-600">
          <p>
            Welcome to Tabeebak, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Tabeebak, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Tabeebak is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you&apos;re booking your first appointment or
            managing ongoing care, Tabeebak is here to support you every step of
            the way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Tabeebak is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          Why <span className="text-gray-700 font-semibold">Choose US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer hover:text-white  border">
          <b>EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer hover:text-white  border">
          <b>CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="px-10 md:px-16 sm:py-16 py-8 flex flex-col gap-5 text-[15px] hover:bg-primary transition-all duration-300 text-gray-600 cursor-pointer hover:text-white  border">
          <b>PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
