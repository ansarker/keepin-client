import React, { useRef } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ showModal, setShowModal, heading, children }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal ? (
        <div
          className="absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70"
          ref={modalRef}
          onClick={closeModal}
        >
          <div
            className="bg-white w-full md:w-2/3 lg:w-2/5 relative top-1/2 left-1/2 md:rounded-lg"
            style={{ transform: "translateY(-50%) translateX(-50%)" }}
          >
            <div
              className="flex items-center justify-between p-2"
              style={{ boxShadow: "0 2px 1px -2px #000000" }}
            >
              <h3 className="text-black font-bold text-lg">{heading}</h3>
              <button
                onClick={() => setShowModal((show) => !show)}
                className="bg-gray-100 text-black p-2 rounded text-right hover:bg-gray-200 hover:text-red-600"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
