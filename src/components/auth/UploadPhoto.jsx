import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { FaSpinner, FaUpload } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import Modal from "../libs/Modal";

const UploadPhoto = ({ id, setUpdated, showModal, setShowModal }) => {
  const { authTokens } = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, message: "" });
  const inputFile = useRef(null);
  const [image, setImage] = useState(null);
  const [thumb, setThumb] = useState(null);

  const onUploadButton = () => {
    inputFile.current.click();
  };

  const onSubmitPhoto = () => {
    const uploadPhoto = async () => {
      setState({ loading: true, message: "" });
      try {
        const response = await axios.put(
          "/auth/upload-photo",
          { _id: id, photo: thumb },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access_token}`,
            },
          }
        );

        if (response.status === 200) {
          setState({ loading: false, message: "" });
          setUpdated((updated) => !updated);
          setShowModal((show) => !show);
        } else {
          setState({ loading: false, message: "Something went wrong!" });
          setTimeout(() => {
            setState({ message: "" });
          }, 5000);
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };

    uploadPhoto();
  };

  const onBrowseFile = (evt) => {
    const imageEvt = evt.target.files[0];
    setImage(imageEvt);
    if (imageEvt.type.match(/image.*/)) {
      const fileReader = new FileReader();
      fileReader.onload = (readerEvt) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const RATIO = image.width / image.height;
          let IMG_WIDTH = 200;
          let IMG_HEIGHT = Math.round(IMG_WIDTH / RATIO);

          canvas.width = IMG_WIDTH;
          canvas.height = IMG_HEIGHT;

          context.drawImage(image, 0, 0, IMG_WIDTH, IMG_HEIGHT);
          const dataUrl = canvas.toDataURL(imageEvt.type);
          setThumb(dataUrl);
        };
        image.src = readerEvt.target.result;
      };
      fileReader.readAsDataURL(imageEvt);
    }
  };
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      heading="Change picture"
    >
      <div className="flex flex-col items-center">
        {!thumb ? (
          <div>
            <button
              onClick={onUploadButton}
              className="flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm"
            >
              <FaUpload />
              <span className="ml-2">Upload Photo</span>
            </button>
            <input
              type="file"
              id="file"
              accept="image/jpg, image/JPG, image/png, image/PNG, image/jpeg, image/JPEG"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={onBrowseFile}
            />
          </div>
        ) : (
          <div>
            <div className="h-40 w-40 shadow">
              <img
                src={thumb}
                alt="uploaded photo"
                className="w-full h-full overflow-hidden rounded"
              />
            </div>
            <div className="w-full py-2 my-2 block">
              {state.loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Uploading...
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={onSubmitPhoto}
                className="bg-green-100 text-green-900 font-bold rounded-md px-3 py-1"
              >
                Save
              </button>
              <button
                onClick={() => setThumb((thumb) => !thumb)}
                className="bg-red-100 text-red-900 font-bold rounded-md px-3 py-1"
              >
                Cancel
              </button>
            </div>
            <div className="w-full mt-2">
              <div
                className={`flex flex-wrap bg-red-100 p-1 rounded-md items-center justify-center ${
                  state.message ? "" : "hidden"
                }`}
              >
                <span className="text-red-600 text-xs">{state.message}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UploadPhoto;
