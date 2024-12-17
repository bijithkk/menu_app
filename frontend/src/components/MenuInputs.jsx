import React from "react";

const MenuInputs = ({onChange,placeholder,type}) => {
  return (
    <input
      type={!type ? "text" : "number" }
      onChange={onChange}
      placeholder={placeholder}
      className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded"
    />
  );
};

export default MenuInputs;
