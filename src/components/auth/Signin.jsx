import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaCircleNotch, FaFacebookSquare, FaGoogle } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Signin = () => {
  const { userSignin, state } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const onSignin = () => {
    userSignin(username, password);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div
        className="w-full lg:w-1/3 md:w-1/2 md:rounded-lg md:bg-white p-6 md:p-12"
        style={{ width: "480px" }}
      >
        {state.message && (
          <div
            className={`absolute top-0 left-0 right-0 text-center bg-red-100 py-1`}
          >
            <p className="text-xs text-red-700">{state.message}</p>
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-lg text-white md:text-gray-900 md:text-2xl md:mb-3 font-bold">
            Sign in
          </h1>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-full bg-white px-3 py-2 rounded border outline-none text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={viewPassword ? "text" : "password"}
                placeholder="********"
                className="w-full bg-white px-3 py-2 rounded border outline-none text-gray-700"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  className="text-gray-600 text-xl"
                  onClick={() => setViewPassword((view) => !view)}
                >
                  {viewPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <button
              onClick={onSignin}
              type="button"
              disabled={state.loading}
              className="bg-green-500 hover:bg-green-700 text-white tracking-wider w-full p-3 rounded-md shadow-md font-bold"
            >
              {state.loading ? (
                <span className="flex items-center justify-center">
                  <FaCircleNotch className="animate-spin mr-2" /> Signing in...
                </span>
              ) : (
                <span>Signin</span>
              )}
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-white md:text-gray-700 mb-6">
          OR
        </p>
        <div className="grid grid-cols-1 gap-4 mb-5">
          <button
            className="text-base font-bold bg-white hover:bg-gray-50 shadow-md hover:text-gray-700 flex items-center justify-center py-2 rounded-md"
            style={{ color: "#3B5998" }}
          >
            {" "}
            <FaFacebookSquare className="mx-2" /> <span>Facebook</span>
          </button>
          <button
            className="text-base font-bold bg-white hover:bg-gray-50 shadow-md hover:text-gray-700 flex items-center justify-center py-2 rounded-md"
            style={{ color: "#cc0033" }}
          >
            {" "}
            <FaGoogle className="mx-2" /> <span>Google</span>
          </button>
        </div>
        <Link
          to="/forgotpassword"
          className="text-base font-normal md:font-bold text-white md:text-blue-800 hover:text-blue-400"
        >
          Forgot Password?
        </Link>
        <div className="flex flex-row items-center justify-center mt-6">
          <span className="text-white md:text-gray-700 text-sm font-medium mr-3">
            Not a member?
          </span>
          <Link
            to="/"
            className="text-sm font-medium text-blue-700 hover:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
