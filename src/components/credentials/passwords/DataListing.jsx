import React from "react";
import PasswordCard from "./PasswordCard";

const Datalisting = ({ data, remove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
      {data.map((item) => (
        <PasswordCard key={item._id} data={item} remove={remove} />
      ))}
    </div>
  );
};

export default Datalisting;
