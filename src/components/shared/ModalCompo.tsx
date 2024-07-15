"use client"
import React from "react";

const Modal: React.FC<{ onClose: () => void, children: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
