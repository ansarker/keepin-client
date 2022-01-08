import axios from "axios";
import React, { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const Editprofile = ({ user, setUpdated }) => {
  const { authTokens } = useContext(AuthContext);
  const [updateUser, setUpdateUser] = useState(user);
  const [state, setState] = useState({ loading: false, message: "" });

  const onProfileChange = (evt) => {
    setUpdateUser({ ...updateUser, [evt.target.name]: evt.target.value });
  };

  const onUpdateUser = () => {
    const { firstName, lastName, email, _id } = updateUser;
    const updateUserData = async () => {
      setState({ loading: true, message: "" });
      try {
        const response = await axios.put(
          "/auth/edit-profile",
          { firstName, lastName, email, _id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access_token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setState({ loading: false, message: "" });
          setUpdated((updated) => !updated);
        } else {
          setState({ loading: false, message: "Something went wrong" });
          setTimeout(() => {
            setState({ message: "" });
          }, 5000);
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };
    updateUserData();
  };

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-black text-gray-900">
        Edit Profile
      </h1>
      <div className="py-8">
        <div className="w-full max-w-lg">
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                value={updateUser.firstName}
                placeholder="Firstname"
                onChange={onProfileChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={updateUser.lastName}
                placeholder="Lastname"
                onChange={onProfileChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder={user.username}
                disabled={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="appearance-none block w-full bg-white text-gray-600 border border-gray-400 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder={user.email}
                value={updateUser.email}
                onChange={onProfileChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-2 items-center justify-end">
            <button
              disabled={state.loading}
              onClick={onUpdateUser}
              className="bg-green-500 text-black px-7 py-2 hover:text-white text-lg font-semibold rounded-md"
            >
              {state.loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Saving Profile
                </span>
              ) : (
                <span>Save Profile</span>
              )}
            </button>
          </div>
          <div
            className={`flex flex-wrap mb-2 items-center justify-end ${
              state.message ? "" : "hidden"
            }`}
          >
            <span className="text-red-600 text-xs">{state.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
