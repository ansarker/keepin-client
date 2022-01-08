import React from "react";
import Sidebar from "./Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div className="bg-gray-100 md:min-h-screen w-full">
      <Sidebar />
      <div className="mt-20 relative min-h-screen md:ml-60 p-2 md:p-4">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
