import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdDeleteOutline, MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const DataCard = ({ data, remove }) => {
  let { number } = data;
  const { authTokens } = useContext(AuthContext);
  const [dataS, setDataS] = useState(data);
  const [favorite, setFavorite] = useState(data?.favorite);

  useEffect(() => {
    setDataS(data);
  }, [data, favorite]);

  const addToFavorite = (item) => {
    axios
      .put(
        "/cards/favorite",
        { _id: item._id, favorite: !favorite },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        }
      )
      .then((res) => {
        setFavorite((fav) => !fav);
      });
  };
  number = number.substr(12, 16);

  return (
    <div className="items-center justify-center w-full bg-white rounded-lg shadow p-4 pl-0 md:p-6 md:pl-0">
      <div className="flex items-center justify-between">
        <div
          onClick={() => addToFavorite(dataS)}
          className="text-2xl px-2 cursor-pointer"
        >
          {favorite ? (
            <IoHeart className="text-red-600" />
          ) : (
            <IoHeartOutline className="text-red-600" />
          )}
        </div>
        <div className="text-left flex-grow">
          <p className="text-left text-xl text-gray-800 font-bold mb-1">
            {dataS.title}
          </p>
          <p className="text-left text-sm capitalize text-gray-500 font-normal flex items-center mb-2">
            {dataS.brand}, ****{number}
          </p>
        </div>
        <div className="flex flex-col items-center justify-end">
          <Link
            to={`/cards/${dataS._id}`}
            className="text-2xl text-gray-600 hover:text-gray-400"
          >
            <MdDescription />
          </Link>
          <button
            onClick={() => remove(dataS)}
            className="text-2xl text-red-600 hover:text-red-400"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
