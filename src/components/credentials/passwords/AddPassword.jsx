import React, { useContext, useState } from "react";
import axios from "axios";
import Modal from "../../libs/Modal";
import AuthContext from "../../../context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";

const AddPassword = ({
  passwordListing,
  setPasswordListing,
  showModal,
  setShowModal,
}) => {
  const { authTokens } = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, message: "" });
  const [viewPassword, setViewPassword] = useState(false);

  const [accountInfo, setAccountInfo] = useState({
    title: "",
    email: "",
    username: "",
    url: "",
    password: "",
  });

  const onAccountInfoChange = (evt) => {
    const value = evt.target.value;
    setAccountInfo({
      ...accountInfo,
      [evt.target.name]: value,
    });
  };

  const submitAccountInfo = () => {
    const add = () => {
      setState({ loading: true, message: null });
      axios
        .post(`passwords/create`, accountInfo, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        })
        .then((response) => {
          setPasswordListing([...passwordListing, response.data.result]);
          setShowModal(false);
          setState({ loading: false });
        })
        .catch((error) => {
          setPasswordListing([...passwordListing]);
          setState({ loading: false, message: error.response.data.error });
          setTimeout(() => {
            setState({ message: "" });
          }, 5000);
        });
    };
    add();
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading={"Add new password"}
    >
      <div className="w-full box-border mb-6">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          name="title"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="ex. Github"
        />
      </div>
      <div className="w-full box-border mb-6">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          name="email"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="email"
          placeholder="ex. johndoe@xxxxx.xxx"
        />
      </div>
      <div className="w-full box-border mb-6">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          name="username"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="ex. john_doe"
        />
      </div>
      <div className="w-full box-border mb-6">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            onChange={onAccountInfoChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
            type={viewPassword ? "text" : "password"}
            placeholder="********"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              className="text-gray-600 text-lg"
              onClick={() => setViewPassword((view) => !view)}
            >
              {viewPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full box-border mb-6">
        <label
          className="block uppercase tracking-wider text-gray-700 text-sm font-bold mb-2"
          htmlFor="url"
        >
          Url
        </label>
        <input
          name="url"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-3 px-4 focus:outline-none focus:bg-white"
          type="text"
          placeholder="ex. www.github.com"
        />
      </div>

      <button
        disabled={state.loading}
        onClick={submitAccountInfo}
        className="w-full py-2 bg-gradient-to-b from-gray-600 to-gray-700 text-white text-lg font-bold tracking-wider rounded-xl shadow-xl"
      >
        {state.loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Saving...
          </span>
        ) : (
          <span>Save</span>
        )}
      </button>
      <div
        className={`w-full box-border bg-red-100 p-1 rounded-md mt-2 ${
          state.message ? "" : "hidden"
        }`}
      >
        <span className="text-red-600 text-xs">{state.message}</span>
      </div>
    </Modal>
  );
};

export default AddPassword;
