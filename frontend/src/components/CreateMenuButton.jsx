import React from "react";

const CreateMenuButton = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-2/3 items-center sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
    >
      {children}
    </button>
  );
};

export default CreateMenuButton;
