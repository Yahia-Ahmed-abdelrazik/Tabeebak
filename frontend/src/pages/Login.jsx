import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com")) {
      toast.error(
        "Email must be a valid Gmail address (e.g. yourname@gmail.com)"
      );
      navigate("/login");
      return;
    }

    try {
      if (state == "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          // navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          // navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 border  min-w-[340px] rounded-xl sm:min-w-96 text-zinc text-sm  shadow-lg">
        <p className="text-2xl font-semibold">
          {state == "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state == "Sign Up" ? "sign up " : "log in"} to book
          appointment
        </p>
        {/*  */}
        {state == "Sign Up" ? (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        ) : (
          ""
        )}
        <div className="w-full">
          <p>Email</p>
          {/* <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> */}
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[30px] text-xl text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {/* btn */}
        <button
          onClick={() => {
            // setToken(true);
            // navigate("/");
          }}
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state == "Sign Up" ? "Create Account" : "Login"}
        </button>
        {/* sin text */}
        {state === "Sign Up" ? (
          <p>
            Already have an account ?
            <span
              onClick={() => setState("Login")}
              className="underline text-primary cursor-pointer"
            >
              {" "}
              Login Here{" "}
            </span>
          </p>
        ) : (
          <p>
            Create an new account ?
            <span
              onClick={() => setState("Sign Up")}
              className="underline text-primary cursor-pointer"
            >
              {" "}
              click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
