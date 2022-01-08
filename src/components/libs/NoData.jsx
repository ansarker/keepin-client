import React from "react";
import { FaSadTear } from "react-icons/fa";

const NoData = ({ heading, message }) => {
  return (
    <div className="bg-white shadow-md flex flex-col items-center justify-center p-6 md:p-12 rounded-md">
      <div className="mb-3">
        <FaSadTear className="text-yellow-500 text-2xl" />
      </div>
      <h1 className="text-base md:text-lg font-bold mb-2 text-gray-500">
        {heading}
      </h1>
      <p className="text-xs font-normal text-gray-400">{message}</p>
    </div>
  );
};

export default NoData;
