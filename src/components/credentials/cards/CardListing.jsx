import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import AuthContext from "../../../context/AuthContext";
import { SearchContext } from "../../../context/SearchProvider";
import Loading from "../../libs/Loading";
import NoData from "../../libs/NoData";
import AddCard from "./AddCard";
import Datalisting from "./DataListing";

const CardListing = () => {
  const { authTokens } = useContext(AuthContext);
  const { value } = useContext(SearchContext);
  const [showModal, setShowModal] = useState(false);
  const [cardListing, setCardListing] = useState([]);
  const [state, setState] = useState({ loading: false, message: "" });
  const [deleted, setDeleted] = useState(false);

  const handleModal = () => {
    setShowModal((show) => !show);
  };

  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true, message: "" });
      try {
        const response = await axios.get("/cards/read", {
          params: {
            q: value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });
        if (response.status === 201) {
          setState({ loading: false, message: "" });
          setCardListing(response.data.data);
        }
      } catch (error) {
        setState({ loading: false, message: error.response.data.error });
        setTimeout(() => {
          setState({ message: "" });
        }, 5000);
      }
    };
    fetchData();

    return () => {
      setState({ loading: true, message: "" });
      setCardListing({});
      setDeleted(false);
    };
  }, [authTokens, value, setCardListing, deleted]);

  const remove = (data) => {
    axios
      .post(
        "/cards/delete",
        { _id: data._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        }
      )
      .then((res) => setDeleted(!deleted));
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
        Saved Cards
      </h1>
      {state.loading && <Loading message="Fetching data..." />}
      {state.message && (
        <div>
          <h1>Error while fetching data...</h1>
          <p>{state.message}</p>
        </div>
      )}
      {cardListing.length > 0 ? (
        <Datalisting data={cardListing} remove={remove} />
      ) : (
        <NoData heading="Empty List" message="You haven't kept any cards yet" />
      )}
      <AddCard
        cardListing={cardListing}
        setCardListing={setCardListing}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CardListing;
