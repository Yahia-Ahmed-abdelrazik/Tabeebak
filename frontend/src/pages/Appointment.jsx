import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);

  const { doctors, currencySymbol, token, backendUrl, getDocttorsData } =
    useContext(AppContext);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigate = useNavigate();

  function fetchDocInfo() {
    const docInfo = doctors.find((doc) => {
      return doc._id === docId;
    });
    setDocInfo(docInfo);
  }

  async function getAvailableSlots() {
    setDocSlots([]);
    //current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //date withe index
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      //setting end time of the date withe index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0);
      // handle current date
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      // handle time(hh:mm) for on day
      while (endTime > currentDate) {
        let formatingForTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);

        //
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formatingForTime;
        //????????????????????have ana issue
        // console.log("docInfo", docInfo);
        // console.log("slots_booked{slotDate}", docInfo.slots_booked[slotDate]);
        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          //add time slot to the array
          timeSlots.push({
            timedate: new Date(currentDate),
            time: formatingForTime,
          });
        }
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIdx][0].timedate;

      // console.log(docSlots[slotIdx][0]);
      // console.log(date);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDocttorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* doc details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo?.image}
              alt=""
            />
          </div>
          {/* doc info */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo?.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {docInfo?.degree} - {docInfo.speciality}{" "}
              <button className="py-.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee :
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots </p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 pb-4">
            {docSlots.length &&
              docSlots.map((item, idx) => {
                return (
                  <div
                    onClick={() => setSlotIdx(idx)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIdx === idx
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={idx}
                  >
                    <p>{item[0] && daysOfWeek[item[0].timedate.getDay()]}</p>
                    <p>{item[0] && item[0].timedate.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex overflow-x-scroll  items-center gap-3 w-full mt-4 pb-4 ">
            {docSlots.length &&
              docSlots[slotIdx].map((item, idx) => {
                return (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`flex-shrink-0 text-sm font-light px-5 py-2 rounded-full cursor-pointer ${
                      slotTime == item.time
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={idx}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm  font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        {/* related doc */}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
}

export default Appointment;
