import React from "react";
import { FaCircleNotch } from "react-icons/fa";

const Loading = ({ message }) => {
  return (
    <div className="flex items-center justify-center bg-white py-2 px-5">
      <FaCircleNotch className="animate-spin text-black" />
      <span className="ml-1 text-sm">{message} </span>
    </div>
  );
};

export default Loading;
