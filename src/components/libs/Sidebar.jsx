import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoApps } from "react-icons/io5";
import { FaSignOutAlt, FaCreditCard } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import Header from "./Header";
import AuthContext from "../../context/AuthContext";

const Sidebar = () => {
  const { signOut, user, authTokens } = useContext(AuthContext);
  const { username } = user;
  const [userProfile, setUserProfile] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let fetchUserProfile = async () => {
      try {
        let { access_token } = authTokens;
        let response = await axios.get("/auth/user-profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.status === 200) {
          let { data } = response;
          setUserProfile(data.user);
        } else {
        }
      } catch (error) {}
    };
    fetchUserProfile();
  }, [authTokens]);

  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed lg:fixed left-0 lg:left-60 lg:right-60 right-0 top-0 z-50">
      <Header open={open} handleSidebar={handleSidebar} />
      <div
        className={`bg-white ${
          open ? "hidden" : ""
        } md:w-60 md:visible md:mt-20 md:block md:fixed md:top-0 md:bottom-0 p-4`}
      >
        <div className="relative flex flex-col">
          <div>
            <Link
              to="/dashboard"
              className="flex w-full items-center text-sm font-semibold text-black hover:bg-blue-50 hover:text-blue-600 px-4 py-2 rounded-full"
            >
              <IoApps className="mr-2" /> <span>All Items</span>
            </Link>
            <Link
              to="/favorites"
              className="flex w-full items-center text-sm font-semibold text-black hover:bg-blue-50 hover:text-blue-600 px-4 py-2 rounded-full"
            >
              <IoHeart className="mr-2" /> <span>Favorites</span>
            </Link>
          </div>
          <div className="my-3">
            <p className="font-bold text-base text-gray-400">Categories</p>
            <div className="flex flex-col items-start mt-3 max-h-96 overflow-y-auto">
              <Link
                to="/passwords"
                className="flex w-full items-center text-sm font-semibold text-black hover:bg-blue-50 hover:text-blue-600 px-4 py-2 rounded-full"
              >
                <MdPassword className="mr-2" /> <span>Password</span>
              </Link>
              <Link
                to="/cards"
                className="flex w-full items-center text-sm font-semibold text-black hover:bg-blue-50 hover:text-blue-600 px-4 py-2 rounded-full"
              >
                <FaCreditCard className="mr-2" /> <span>Card</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:absolute md:bottom-4 md:left-4 md:right-4 flex items-center justify-between">
          <Link to="/profile" className="flex items-center">
            <div className="rounded-full shadow-md w-12 h-12 border-2 border-gray-900 mr-2">
              <img
                src={
                  userProfile?.photo
                    ? userProfile.photo
                    : "https://e1.pngegg.com/pngimages/472/175/png-clipart-gray-icons-person-thumbnail.png"
                }
                alt="Profile Picture"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-700 font-bold">{username}</p>
            </div>
          </Link>
          <button onClick={signOut} className="text-gray-700 text-2xl">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
