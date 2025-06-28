import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const PatientHistory = () => {
  const { patientId } = useParams();
  const { getPatientData, patientData } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    getPatientData(patientId);

    // console.log("patientData:", patientData);
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

      <form onSubmit={handleSubmit} className=" w-full mt-2">
        <p className="mb-3 text-lg font-medium">Add Patient History</p>

        <div className="bg-white px-8 py-8  border-2 border-gray-100 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex flex-col gap-4 text-gray-600">
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

            <button
              type="submit"
              className="self-center bg-primary hover:bg-blue-800 px-10 py-4 mt-4 text-white rounded-full"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {/*  */}
    </div>
  );
};

export default PatientHistory;
