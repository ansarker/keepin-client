import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { api } from "../../config/config";
import { FaCircleNotch } from "react-icons/fa";

const Resetpassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState({ pending: false, message: "" });
  const [success, setSuccess] = useState("");

  const onSubmit = () => {
    setState({ pending: true, message: "" });
    if (!newPassword || !confirmPassword) {
      setState({ message: "Please enter your new password." });
    }

    if (newPassword !== confirmPassword) {
      setState({ message: "Passwords don't match" });
    }

    axios
      .put(
        `${api}/auth/reset-password/${resetToken}`,
        { password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSuccess(`Password changed successfully!`);
          setState({ pending: false, message: "" });
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((err) => {
        setState({ pending: false, message: err.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
          setSuccess("");
        }, 5000);
      });
  };
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full lg:w-1/3 md:w-1/2 md:rounded-lg md:bg-white p-6 md:p-12">
        {state.message && (
          <div
            className={`absolute top-0 left-0 right-0 text-center bg-red-100 py-1`}
          >
            <p className="text-xs text-red-700">{state.message}</p>
          </div>
        )}
        {success && (
          <div
            className={`absolute top-0 left-0 right-0 text-center bg-green-100 py-1`}
          >
            <p className="text-xs text-green-700">{success}</p>
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-lg text-white md:text-gray-900 md:text-2xl md:mb-2 font-bold">
            Reset Password
          </h1>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">
              New Password
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 rounded border outline-none text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold hidden md:block text-base mb-2 text-white md:text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 rounded border outline-none text-gray-700"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={onSubmit}
              disabled={state.pending}
              className="bg-green-500 hover:bg-green-700 text-white tracking-wider w-full p-3 rounded-md shadow-md font-bold"
            >
              {state.pending ? (
                <span className="flex items-center justify-center">
                  <FaCircleNotch className="animate-spin mr-2" /> Submitting...
                </span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
