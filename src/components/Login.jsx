import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
    const [emailId, setEmailId] = useState("rutvik@gmail.com");
    const [password, setPassword] = useState("Rutvik@123");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    //   console.log(res);
      dispatch( addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-96 bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body gap-4">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-sm text-gray-500">
                    Login to your account
                </p>

                <div className="divider my-1"></div>

                {/* Email */}
                <label className="form-control w-full">
                    <div className="label">
                    <span className="label-text font-medium">Email</span>
                    </div>
                    <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="you@example.com"
                    className="
                        input input-bordered w-full
                        focus:outline-none focus:border-primary
                        transition-all
                    "
                    />
                </label>

                {/* Password */}
                <label className="form-control w-full">
                    <div className="label">
                    <span className="label-text font-medium">Password</span>
                    </div>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="
                        input input-bordered w-full
                        focus:outline-none focus:border-primary
                        transition-all
                    "
                    />
                </label>

                {/* Error */}
                {error && (
                    <div className="alert alert-error py-2 text-sm">
                    {error}
                    </div>
                )}

                {/* Button */}
                <button
                    onClick={handleLogin}
                    className="
                    btn btn-primary w-full mt-2
                    text-base font-semibold
                    rounded-xl
                    shadow-md
                    hover:shadow-xl
                    transition-all duration-200
                    hover:scale-[1.02]
                    active:scale-95
                    "
                >
                    Login
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-2">
                    Don’t have an account?{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                    Sign up
                    </span>
                </p>

                </div>
            </div>
        </div>

    );
};
export default Login;