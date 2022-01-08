import axios from "axios";
import React, { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import AuthContext from "../../../context/AuthContext";
import Modal from "../../libs/Modal";

const brand = [
  { value: "visa", title: "Visa" },
  { value: "mastercard", title: "Mastercard" },
  { value: "american_express", title: "American Express" },
  { value: "unionpay", title: "UnionPay" },
  { value: "other", title: "Other" },
];

const months = [
  { value: "january", number: 1 },
  { value: "february", number: 2 },
  { value: "march", number: 3 },
  { value: "april", number: 4 },
  { value: "may", number: 5 },
  { value: "june", number: 6 },
  { value: "july", number: 7 },
  { value: "august", number: 8 },
  { value: "september", number: 9 },
  { value: "october", number: 10 },
  { value: "november", number: 11 },
  { value: "december", number: 12 },
];

const EditCard = ({ data, setIsUpdated, showModal, setShowModal }) => {
  const { authTokens } = useContext(AuthContext);
  const [updateData, setUpdateData] = useState(data);
  const [state, setState] = useState({ loading: false, message: "" });
  const [viewNumber, setViewNumber] = useState(false);
  const [viewSecurityCode, setViewSecurityCode] = useState(false);
  const [viewPincode, setViewPincode] = useState(false);

  const onAccountInfoChange = (evt) => {
    setUpdateData({ ...updateData, [evt.target.name]: evt.target.value });
  };

  const onUpdateData = () => {
    const updateCard = async () => {
      setState({ loading: true, message: "" });
      const { _id } = updateData;

      try {
        const response = await axios.put(`cards/edit/${_id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });
        if (response.status === 200) {
          setState({ loading: false, message: "" });
          setShowModal(false);
          setIsUpdated(true);
        } else {
          setState({ loading: false, message: "Something went wrong!" });
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

    updateCard();
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading="Edit card details"
    >
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="title"
        >
          Title
        </label>
        <input
          value={updateData.title}
          name="title"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
          type="text"
          placeholder="Title"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="title"
        >
          Cardholder
        </label>
        <input
          value={updateData.cardholder}
          name="cardholder"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
          type="text"
          placeholder="Cardholder"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="number"
        >
          Accound Number
        </label>
        <div className="relative">
          <input
            value={updateData.number}
            name="number"
            onChange={onAccountInfoChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
            type={viewNumber ? "text" : "password"}
            placeholder="number"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              className="text-gray-600 text-lg"
              onClick={() => setViewNumber((view) => !view)}
            >
              {viewNumber ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="brand"
        >
          Brand
        </label>
        <select
          name="brand"
          defaultValue={updateData.brand}
          onChange={onAccountInfoChange}
          className="block w-full bg-gray-200 capitalize text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        >
          {brand.map((b) => (
            <option value={b.value} key={b.value} className="capitalize">
              {b.value}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="expiration_month"
        >
          Expiration Month
        </label>
        <select
          name="expiration_month"
          defaultValue={updateData.expiration_month}
          onChange={onAccountInfoChange}
          className="block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        >
          {months.map((month) => (
            <option
              className="capitalize"
              value={month.value}
              key={month.value}
            >
              {`${month.number} - ${month.value}`}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="expiration_year"
        >
          Expiration Year
        </label>
        <input
          value={updateData.expiration_year}
          name="expiration_year"
          onChange={onAccountInfoChange}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
          type="text"
          placeholder="Expiration Year"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="security_code"
        >
          Security Code
        </label>
        <div className="relative">
          <input
            value={updateData.security_code}
            name="security_code"
            onChange={onAccountInfoChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
            type={viewSecurityCode ? "text" : "password"}
            placeholder="Security Code"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              className="text-gray-600 text-lg"
              onClick={() => setViewSecurityCode((view) => !view)}
            >
              {viewSecurityCode ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase tracking-wider text-gray-700 text-xs font-bold mb-1"
          htmlFor="pincode"
        >
          Pincode
        </label>
        <div className="relative">
          <input
            value={updateData.pincode}
            name="pincode"
            onChange={onAccountInfoChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
            type={viewPincode ? "text" : "password"}
            placeholder="Pincode"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button
              className="text-gray-600 text-lg"
              onClick={() => setViewPincode((view) => !view)}
            >
              {viewPincode ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>
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

export default EditCard;
