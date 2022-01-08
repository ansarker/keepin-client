import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import AuthContext from "../../context/AuthContext";
import Loading from "../libs/Loading";
import { dateFormater } from "../../assets/js/helpers";
import { FaCamera } from "react-icons/fa";
import UploadPhoto from "./UploadPhoto";

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const [state, setState] = useState({ loading: false, message: "" });
  const [userProfile, setUserProfile] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [tab, setTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((show) => !show);
  };

  const onTabChange = (event) => {
    setTab(event.target.name);
  };

  useEffect(() => {
    let fetchUserProfile = async () => {
      setState({ loading: true, message: "" });
      try {
        let { access_token } = authTokens;
        let response = await axios.get("/auth/user-profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.status === 200) {
          setState({ loading: false, message: "" });
          let { data } = response;
          setUserProfile(data.user);
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
    fetchUserProfile();
  }, [authTokens, updated]);

  return (
    <div>
      <div className="relative">
        <div
          className="w-full h-32 rounded-xl"
          style={{ background: "#202124" }}
        ></div>
        <div className="relative -top-16 left-1/2 transform -translate-x-1/2">
          {state.loading ? (
            <div
              className="w-40 h-40 rounded-full border-4 hadow flex items-center justify-center p-4 mx-auto bg-gradient-to-b from-gray-900 to-gray-600"
              style={{ borderColor: "#202124" }}
            >
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
              </div>
            </div>
          ) : (
            <div className="w-40 h-40 mx-auto relative">
              <img
                src={
                  userProfile?.photo
                    ? userProfile.photo
                    : "https://e1.pngegg.com/pngimages/472/175/png-clipart-gray-icons-person-thumbnail.png"
                }
                alt="Profile Picture"
                className="w-40 h-40 rounded-full border-4 mx-auto"
                style={{ borderColor: "#202124" }}
              />
              <button
                onClick={handleModal}
                className="absolute right-3 bottom-1 rounded-full p-2 bg-white opacity-70 hover:opacity-100 text-gray-600 hover:text-gray-900"
              >
                <FaCamera />
              </button>
            </div>
          )}
        </div>
        <div className="relative bottom-3">
          <ul className="flex justify-start">
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="profile"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 rounded-md ${
                  tab === "profile" ? "border-b-4 border-purple-600" : ""
                }`}
              >
                Account Overview
              </button>
            </li>
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="edit_profile"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 rounded-md ${
                  tab === "edit_profile" ? "border-b-4 border-purple-600" : ""
                }`}
              >
                Edit Profile
              </button>
            </li>
            <li style={{ marginRight: "1px" }}>
              <button
                onClick={onTabChange}
                name="change_password"
                className={`font-bold text-black text-sm p-2 bg-gray-300 hover:bg-gray-200 rounded-md ${
                  tab === "change_password"
                    ? "border-b-4 border-purple-600"
                    : ""
                }`}
              >
                Change Password
              </button>
            </li>
          </ul>
        </div>
      </div>
      {tab === "profile" &&
        (state.loading ? (
          <Loading />
        ) : userProfile ? (
          <div>
            <h1 className="text-xl md:text-3xl font-black text-gray-900">
              Account Overview
            </h1>
            <div className="py-8">
              <h2 className="mb-3 text-gray-600 text-xl font-bold">Profile</h2>
              <div className="bg-white shadow rounded-md">
                <div className="p-4 border-b">
                  <p className="text-sm tracking-wide font-semibold text-gray-800">
                    Name
                  </p>
                  <p className="text-base leading-7 font-medium text-gray-600">
                    {userProfile.firstName
                      ? userProfile.firstName
                      : "Firstname"}{" "}
                    {userProfile.lastName ? userProfile.lastName : "Lastname"}
                  </p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm tracking-wide font-semibold text-gray-800">
                    Username
                  </p>
                  <p className="text-base leading-7 font-medium text-gray-600">
                    {userProfile.username}
                  </p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm tracking-wide font-semibold text-gray-800">
                    Email
                  </p>
                  <p className="text-base leading-7 font-medium text-gray-600">
                    {userProfile.email}
                  </p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm tracking-wide font-semibold text-gray-800">
                    Last updated on
                  </p>
                  <p className="text-base leading-7 font-medium text-gray-600">
                    {dateFormater(userProfile.updatedAt)}
                  </p>
                </div>
                <div className="p-4 border-b">
                  <p className="text-sm tracking-wide font-semibold text-gray-800">
                    Created on
                  </p>
                  <p className="text-base leading-7 font-medium text-gray-600">
                    {dateFormater(userProfile.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null)}

      {tab === "edit_profile" && (
        <EditProfile user={userProfile} setUpdated={setUpdated} />
      )}

      {tab === "change_password" && <ChangePassword user={userProfile} />}
      <UploadPhoto
        id={userProfile?._id}
        setUpdated={setUpdated}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Profile;
