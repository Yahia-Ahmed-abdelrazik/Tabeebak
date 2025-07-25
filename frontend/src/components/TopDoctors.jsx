import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { doctors } from "../assets/assets_frontend/assets";

function TopDoctors() {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4  gap-y-6 px-3 sm:px-0 ">
        {doctors.slice(0, 10).map((doc) => {
          return (
            <div
              onClick={() => navigate(`/appointment/${doc._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={doc._id}
            >
              <img className="bg-blue-50" src={doc.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    doc.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      doc.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{doc.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{doc.name}</p>
                <p className="text-gray-600 text-sm">{doc.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => navigate("/doctors")}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
}

export default TopDoctors;
