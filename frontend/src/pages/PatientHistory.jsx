import { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../admin/src/assets/assets_admin/assets";

const PatientHistoryPage = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/user/patient-history`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        // console.log(data.history);
        setHistory(data.history);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My History</h2>
      {history.length > 0 ? (
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t  border-2 border-gray-100">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Patient History</p>
          </div>

          <div className="pt-4 border-2 border-gray-100 border-t-0">
            {history
              ?.slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item) => {
                const createdDate = new Date(item.date);
                const today = new Date();
                const diffTime = today.getTime() - createdDate.getTime();
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <div
                    key={item._id}
                    className="p-4 mb-4 border-2 border-gray-100 hover:bg-gray-100 rounded-md shadow-sm hover:shadow-md transition"
                  >
                    {/* */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.doctorId.image}
                          alt={item.doctorId.name}
                          className="w-10 h-10 rounded-full object-cover border border-blue-200 "
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            Dr. {item.doctorId.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.doctorId.email}
                          </p>
                        </div>
                      </div>

                      {/* */}
                      <span className="ml-auto inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full shadow-sm">
                        {diffDays} day{diffDays !== 1 ? "s" : ""} ago
                      </span>
                    </div>

                    {/* */}
                    <h2 className="text-lg font-bold text-blue-700 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-green-600 font-medium mb-2">
                      💊 {item.prescription}
                    </p>
                    <p className="text-sm text-gray-500">
                      📅 {createdDate.toLocaleString()}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
};

export default PatientHistoryPage;
