import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";
import { dateFormater } from "./../../../assets/js/helpers";
import AuthContext from "../../../context/AuthContext";
import Spinner from "../../libs/Spinner";
import { IoEye, IoEyeOff } from "react-icons/io5";
import EditCard from "./EditCard";

const months = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

const CardDetails = () => {
  const { detailId } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showPincode, setShowPincode] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((show) => !show);
  };

  const onAccountNumberShow = () => {
    setShowAccountNumber((showAccountNumber) => !showAccountNumber);
  };

  const onSecurityCodeShow = () => {
    setShowSecurityCode((showSecutiyCode) => !showSecutiyCode);
  };

  const onShowPincode = (salt, pin) => {
    axios
      .get("/cards/decrypt", {
        params: { salt, pin },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access_token}`,
        },
      })
      .then((res) => {
        setPincode(res.data);
        setShowPincode((showPincode) => !showPincode);
      });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/cards/details/${detailId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });

        if (response.status === 200) {
          setDetails(response.data.data);
        } else {
          console.log("Something went wrong!");
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchDetails();
  }, [isUpdated]);

  return details ? (
    <div className="bg-white p-6 md:p-8 w-full md:w-2/3 mx-auto rounded-md shadow-md">
      <div className="flex items-center pb-2 mb-5 justify-between border-b border-gray-400">
        <div className="block">
          <h1 className="text-xl md:text-2xl font-bold md:font-black text-gray-700">
            {details.title}
          </h1>
        </div>
        <div className="flex items-center text-center">
          <button
            onClick={handleModal}
            className="text-gray-600 hover:text-green-400 text-xl font-bold mx-1"
          >
            <FaEdit />
          </button>
          <button className="text-gray-600 hover:text-red-400 text-xl font-bold mx-1">
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="block">
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Cardholder</span>
          <p className="text-sm font-bold text-black">{details.cardholder}</p>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Brand</span>
          <p className="text-sm font-bold text-black capitalize">
            {details.brand}
          </p>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">
            Account Number
          </span>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-black">
              {showAccountNumber
                ? details.number
                : "•".repeat(details.number.length)}
            </p>
            <button onClick={onAccountNumberShow}>
              {showAccountNumber ? (
                <IoEyeOff className="text-gray-600" />
              ) : (
                <IoEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Expiration</span>
          <p className="text-sm font-bold text-black">
            {months[details.expiration_month]}/{details.expiration_year}
          </p>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Security Code</span>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-black">
              {showSecurityCode
                ? details.security_code
                : "•".repeat(details.security_code.length)}
            </p>
            <button onClick={onSecurityCodeShow}>
              {showSecurityCode ? (
                <IoEyeOff className="text-gray-600" />
              ) : (
                <IoEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Pincode</span>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-black">
              {showPincode
                ? pincode
                  ? pincode
                  : details?.pin
                : "•".repeat(details.pin.length)}
            </p>
            <button onClick={() => onShowPincode(details.salt, details.pin)}>
              {showPincode ? (
                <IoEyeOff className="text-gray-600" />
              ) : (
                <IoEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <table className="mt-4">
          <tbody>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">
                  Last modified
                </p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">
                  {details.updatedAt
                    ? dateFormater(details.updatedAt)
                    : "not available"}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-black leading-7 text-sm font-normal text-right">
                  Created
                </p>
              </td>
              <td>
                <p className="ml-3 text-sm leading-7 font-bold text-black">
                  {details.createdAt
                    ? dateFormater(details.createdAt)
                    : "not available"}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <EditCard
          setIsUpdated={setIsUpdated}
          data={details}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default CardDetails;
