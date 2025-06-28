import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets_admin/assets";

const PatientHistory = () => {
  const { patientId } = useParams();
  const { calculateAge } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prescription, setPrescription] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(true);

  const { getPatientData, patientData, getPatientHistory, patientHistory } =
    useContext(DoctorContext);

  useEffect(() => {
    getPatientData(patientId);
    getPatientHistory(patientId);
    console.log("patientData:", patientData);
    // console.log("patientId:", patientId);
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("patientId", patientId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("prescription", prescription);
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/doctor/add-patient-history",
        {
          patientId,
          title,
          description,
          prescription,
        },
        {
          headers: {
            dToken: localStorage.getItem("dToken"),
          },
        }
      );

      //
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      //
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        setPrescription("");
        getPatientHistory(patientId);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

  return (
    <div className="w-full max-w-5xl m-5 ">
      {patientData && patientData.userData ? (
        <h2 className="mb-3 text-lg font-medium">
          {patientData.userData.name} History
        </h2>
      ) : (
        <h2 className="mb-3 text-lg font-medium">Patient History</h2>
      )}
      {patientData && patientData.userData ? (
        <div className="bg-white border-2 border-gray-100 rounded text-sm flex  items-center p-4 gap-6 lg:gap-20">
          {/*  */}
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-20 h-20 object-cover"
              src={patientData.userData.image}
              alt="Patient"
            />
          </div>
          {/*  */}
          <div className="flex flex-col">
            <p className="text-gray-800 font-medium">
              <strong>Name:</strong> {patientData.userData.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {patientData.userData.email}
            </p>
          </div>
          {/*  */}
          <div className="flex flex-col">
            <p className="text-gray-600">
              <strong>Gender:</strong> {patientData.userData.gender}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {patientData.userData.phone}
            </p>
            <p className="text-gray-600">
              <strong>Age:</strong> {calculateAge(patientData.userData.dob)}
            </p>
          </div>
        </div>
      ) : (
        <p className="px-6 py-4">Loading patient data...</p>
      )}
      {/*  */}
      {isOpenForm ? (
        <form onSubmit={handleSubmit} className=" w-full mt-2 ">
          <p className="mb-3 text-lg font-medium">Add Patient History</p>
          <div className="bg-white px-8 py-8  border-2 border-gray-100 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex flex-col gap-4 text-gray-600 ">
              <div className="flex-1 flex flex-col gap-1">
                <p>Title</p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter Title"
                  className="border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Description</p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Enter Description"
                  rows={4}
                  className="border rounded px-3 py-2 outline-none w-full"
                  required
                ></textarea>
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <p>Prescription</p>
                <textarea
                  onChange={(e) => setPrescription(e.target.value)}
                  value={prescription}
                  placeholder="Enter Prescription"
                  rows={4}
                  className="border rounded px-3 py-2 outline-none w-full"
                  required
                ></textarea>
              </div>
              {/*  */}
              <div className="flex justify-center items-center gap-4">
                <button
                  type="submit"
                  className="flex-1/2  bg-primary hover:bg-blue-800 px-10 py-4 mt-4 text-white rounded-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpenForm(false)}
                  className="flex-1/2  bg-red-400 hover:bg-red-800 px-10 py-4 mt-4 text-white rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4 ">
          <button
            onClick={() => setIsOpenForm(true)}
            className="self-center bg-primary hover:bg-blue-800 px-10 py-4 mt-4 text-white rounded-full"
          >
            Add Patient History
          </button>
        </div>
      )}

      {/*  */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t  border-2 border-gray-100">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Patient History</p>
        </div>

        <div className="pt-4 border-2 border-gray-100 border-t-0">
          {patientHistory.history
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
                    <p className="font-semibold text-gray-800">
                      {`DoctorId : ${item.doctorId}`}
                    </p>

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
    </div>
  );
};

export default PatientHistory;
