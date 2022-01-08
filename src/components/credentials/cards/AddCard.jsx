import axios from "axios";
import React, { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
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

const AddCard = ({ cardListing, setCardListing, showModal, setShowModal }) => {
  const { authTokens } = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, message: "" });
  const [viewNumber, setViewNumber] = useState(false);
  const [viewSecurityCode, setViewSecurityCode] = useState(false);
  const [viewPincode, setViewPincode] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    title: "",
    cardholder: "",
    number: "",
    brand: "",
    expiration_month: "",
    expiration_year: "",
    security_code: "",
    pincode: "",
  });

  const onCardInfoChange = (evt) => {
    const value = evt.target.value;
    setCardInfo({ ...cardInfo, [evt.target.name]: value });
  };

  const submitCardInfo = () => {
    const addCardInfo = async () => {
      setState({ loading: true, message: "" });
      try {
        const response = await axios.post("/cards/create", cardInfo, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });
        if (response.status === 200) {
          setCardListing([...cardListing, response.data.result]);
          setShowModal(false);
          setState({ loading: false, message: "" });
        } else {
          setCardListing([...cardListing]);
          setState({ loading: false, message: "Something went wrong!" });
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };

    addCardInfo();
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading={"Add new card"}
    >
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="title"
        >
          Name
        </label>
        <input
          type="text"
          name="title"
          onChange={onCardInfoChange}
          placeholder="ex. Western Union"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="cardholder"
        >
          Cardholder Name
        </label>
        <input
          type="text"
          name="cardholder"
          onChange={onCardInfoChange}
          placeholder="ex. John Doe"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="number"
        >
          Number
        </label>
        <div className="relative">
          <input
            type={viewNumber ? "text" : "password"}
            name="number"
            onChange={onCardInfoChange}
            placeholder="ex. **** **** **** 1105"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
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
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="brand"
        >
          Brand
        </label>
        <select
          name="brand"
          onChange={onCardInfoChange}
          className="block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        >
          {brand.map((b) => (
            <option value={b.value} key={b.value}>
              {b.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="expiration_month"
        >
          Expiration Month
        </label>
        <select
          name="expiration_month"
          onChange={onCardInfoChange}
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
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="expiration_year"
        >
          Expiration Year
        </label>
        <input
          type="text"
          name="expiration_year"
          onChange={onCardInfoChange}
          placeholder="ex. 2021"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
        />
      </div>
      <div className="w-full box-border mb-4">
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="security_code"
        >
          Security Code
        </label>
        <div className="relative">
          <input
            type={viewSecurityCode ? "text" : "password"}
            name="security_code"
            onChange={onCardInfoChange}
            placeholder="ex. ***"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
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
          className="block uppercase text-gray-700 text-xs font-bold mb-1"
          htmlFor="pincode"
        >
          Pincode
        </label>
        <div className="relative">
          <input
            type={viewPincode ? "text" : "password"}
            name="pincode"
            onChange={onCardInfoChange}
            placeholder="ex. ****"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-gray-700 rounded py-2 px-2 focus:outline-none focus:bg-white"
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
        onClick={submitCardInfo}
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

export default AddCard;
