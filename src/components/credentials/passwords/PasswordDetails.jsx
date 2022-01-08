import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { dateFormater } from "../../../assets/js/helpers";
import Spinner from "../../libs/Spinner";
import Edit from "./Edit";
import AuthContext from "../../../context/AuthContext";

const PasswordDetails = () => {
  const { authTokens } = useContext(AuthContext);
  const { detailId } = useParams();
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [password, setPassword] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((show) => !show);
  };

  const showPassword = (salt, watchword) => {
    axios
      .get(`/auth/decrypt`, {
        params: { salt, watchword },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access_token}`,
        },
      })
      .then((res) => {
        setPassword(res.data);
        setShow(!show);
      });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(`/passwords/details/${detailId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access_token}`,
        },
      });
      setDetails(data.data);
      setIsUpdated(false);
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
          <span className="text-xs font-bold text-gray-600">Email</span>
          <p className="text-sm font-bold text-black">{details.email}</p>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Username</span>
          <p className="text-sm font-bold text-black">{details.username}</p>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">Password</span>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-black">
              {show
                ? password
                  ? password
                  : details?.watchword
                : "•".repeat(details.watchword.length)}
            </p>
            <button
              onClick={() => showPassword(details.salt, details.watchword)}
            >
              {show ? (
                <IoEyeOff className="text-gray-600" />
              ) : (
                <IoEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-50 hover:bg-gray-200 border-b border-gray-300 p-2">
          <span className="text-xs font-bold text-gray-600">URL</span>
          <p className="text-sm font-bold text-black">{details.url}</p>
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

        <Edit
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

export default PasswordDetails;
