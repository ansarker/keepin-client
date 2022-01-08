import React, { useContext, useState } from "react";
import axios from "axios";
import Modal from "../../libs/Modal";
import AuthContext from "../../../context/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Edit = ({ data, setIsUpdated, showModal, setShowModal }) => {
  const { authTokens } = useContext(AuthContext);
  const [updateData, setUpdateData] = useState(data);
  const [state, setState] = useState({ loading: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onAccountInfoChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdateData = () => {
    const update = async () => {
      setState({ loading: true, message: "" });
      const { _id } = updateData;
      try {
        const response = await axios.put(`/passwords/edit/${_id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });
        if (response.status === 201) {
          setState({ loading: false, message: "" });
          setShowModal(false);
          setIsUpdated(true);
        } else {
          setState({ loading: false, message: "Something went wrong!" });
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };
    update();
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading="Edit password details"
    >
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          value={updateData.title}
          name="title"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="Title"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          value={updateData.email}
          name="email"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="email"
          placeholder="johndoe@xxxxx.xxx"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          value={updateData.username}
          name="username"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="john_doe"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            value={updateData.password}
            name="password"
            onChange={onAccountInfoChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
            type={showPassword ? "text" : "password"}
            placeholder="********"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              className="text-gray-600 text-lg"
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="url"
        >
          Url
        </label>
        <input
          value={updateData.url}
          name="url"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="ex. github.com"
        />
      </div>
      <button
        disabled={state.loading}
        onClick={onUpdateData}
        className="w-full py-3 bg-gray-700 hover:bg-gray-700 text-white text-base font-bold tracking-wider"
      >
        {state.loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Updating...
          </span>
        ) : (
          <span>Update</span>
        )}
      </button>
      <div
        className={`w-full box-border bg-red-100 p-1 rounded-md mb-2 ${
          state.message ? "" : "hidden"
        }`}
      >
        <span className="text-red-600 text-xs">{state.message}</span>
      </div>
    </Modal>
  );
};

export default Edit;
