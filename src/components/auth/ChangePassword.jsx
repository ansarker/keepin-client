import React, { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Changepassword = ({ user }) => {
  const _id = user?._id;
  const [state, setState] = useState({ loading: false, message: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [viewCurrentPassword, setViewCurrentPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmNewPassword, setViewConfirmNewPassword] = useState(false);

  const onSubmit = () => {
    setState({ loading: true, message: "" });
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setState({ message: "Input fields can't be empty." });
    } else if (newPassword !== confirmNewPassword) {
      setState({ message: "New password and confirm password doesn't match" });
    }
    console.log(currentPassword, newPassword, confirmNewPassword);
    console.log(_id);
    setTimeout(() => {
      setState({ message: "" });
    }, 5000);
  };

  return (
    <div>
      <h1 className="text-red-600 text-4xl font-bold mx-auto">Coming Soon...</h1>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">
        Change Password
      </h1>
      <div className="py-8">
        <div className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type={viewCurrentPassword ? "text" : "password"}
                  placeholder="Current password"
                  onChange={(evt) => setCurrentPassword(evt.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    className="text-gray-600 text-xl"
                    onClick={() => setViewCurrentPassword((view) => !view)}
                  >
                    {viewCurrentPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type={viewNewPassword ? "text" : "password"}
                  placeholder="New password"
                  onChange={(evt) => setNewPassword(evt.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    className="text-gray-600 text-xl"
                    onClick={() => setViewNewPassword((view) => !view)}
                  >
                    {viewNewPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <div className="relative">
                <input
                  className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type={viewConfirmNewPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  onChange={(evt) => setConfirmNewPassword(evt.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    className="text-gray-600 text-xl"
                    onClick={() => setViewConfirmNewPassword((view) => !view)}
                  >
                    {viewConfirmNewPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-2 items-center justify-end">
            <button
              onClick={onSubmit}
              disabled={state.loading}
              className="bg-green-500 text-black px-7 py-2 hover:text-white text-lg font-semibold rounded-md"
            >
              {state.loading ? (
                <span className="flex items-center justify-center">
                  <FaCircleNotch className="animate-spin mr-2" /> Changing
                  Password...
                </span>
              ) : (
                <span>Change Password</span>
              )}
            </button>
          </div>
          {state.message && (
            <div className={`flex flex-wrap mb-2 items-center bg-red-100 p-2`}>
              <p className="text-xs text-red-700">{state.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changepassword;
