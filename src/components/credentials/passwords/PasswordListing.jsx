import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import Loading from "../../libs/Loading";
import NoData from "../../libs/NoData";
import DataListing from "./DataListing";
import AddPassword from "./AddPassword";
import AuthContext from "../../../context/AuthContext";
import { SearchContext } from "../../../context/SearchProvider";

const PasswordListing = () => {
  const { authTokens } = useContext(AuthContext);
  const { value } = useContext(SearchContext);
  const [showModal, setShowModal] = useState(false);
  const [passwordListing, setPasswordListing] = useState([]);
  const [state, setState] = useState({ loading: false, message: "" });
  const [deleted, setDeleted] = useState(false);

  const handleModal = () => {
    setShowModal((show) => !show);
  };

  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true, message: "" });
      try {
        const response = await axios.get("/passwords/read", {
          params: {
            q: value,
          },
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });
        setPasswordListing(response.data.data);
        setState({ loading: false, message: "" });
      } catch (error) {
        setState({ message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };

    fetchData();

    return () => {
      setState({ loading: true, message: null });
      setPasswordListing({});
      setDeleted(false);
    };
  }, [authTokens, value, setPasswordListing, deleted]);

  const remove = (data) => {
    axios
      .post(
        "/passwords/delete",
        { _id: data._id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        }
      )
      .then((res) => {
        setDeleted(!deleted);
      });
  };

  return (
    <div className="mb-3 md:mb-6">
      <div className="mb-6">
        <button
          onClick={handleModal}
          className="flex items-center font-semibold text-sm text-black bg-white shadow-lg py-2 px-5 rounded-md"
        >
          <GrAdd className="mr-2" />
          <span>Add Item</span>
        </button>
      </div>
      <h1 className="text-lg md:text-2xl font-black text-gray-700 mb-3">
        Saved Passwords
      </h1>
      {state.loading && <Loading message={"Fetching data..."} />}
      {state.message && (
        <div>
          <h1>Error while fetching data...</h1>
          <p>{state.message}</p>
        </div>
      )}
      {passwordListing.length > 0 ? (
        <DataListing data={passwordListing} remove={remove} />
      ) : (
        <NoData
          heading="Empty List"
          message="You haven't kept any passwords yet."
        />
      )}
      <AddPassword
        passwordListing={passwordListing}
        setPasswordListing={setPasswordListing}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default PasswordListing;
