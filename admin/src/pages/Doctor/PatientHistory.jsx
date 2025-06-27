import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const PatientHistory = () => {
  const { patientId } = useParams();

  const { getPatientData, patientData } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    getPatientData(patientId);
  }, [patientId]);

  console.log("patientData:", patientData);

  return (
    <div className="w-full max-w-6xl m-5">
      {patientData && patientData.userData ? (
        <h2 className="mb-3 text-lg font-medium">
          {patientData.userData.name} History
        </h2>
      ) : (
        <h2 className="mb-3 text-lg font-medium">Patient History</h2>
      )}
      {patientData && patientData.userData ? (
        <div className="bg-white border-2 border-gray-100 rounded text-sm flex items-center p-4 gap-6">
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
    </div>
  );
};

export default PatientHistory;
