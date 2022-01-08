import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchProvider";
import Loading from "../libs/Loading";
import NoData from "../libs/NoData";
import PasswordListing from "./passwords/DataListing";
import CardListing from "./cards/DataListing";

const Dashboard = () => {
  const { authTokens } = useContext(AuthContext);
  const { value } = useContext(SearchContext);
  const [passwords, setPasswords] = useState([]);
  const [cards, setCards] = useState([]);
  const [passwordState, setPasswordState] = useState({
    loading: false,
    message: "",
  });
  const [cardState, setCardState] = useState({
    loading: false,
    message: "",
  });
  const [passwordDeleted, setPasswordDeleted] = useState(false);
  const [cardDeleted, setCardDeleted] = useState(false);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get("/passwords/read", {
          params: {
            q: value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access_token}`,
          },
        });

        if (response.status === 201) {
          setPasswordState({ loading: false, message: "" });
          setPasswords(response.data.data);
        } else {
          setPasswordState({
            loading: false,
            message: "Something went wrong!",
          });
          setTimeout(() => {
            setPasswordState({ message: "" });
          }, 5000);
        }
      } catch (error) {
        setPasswordState({
          loading: false,
          message: error.response.data.error,
        });
        setTimeout(() => {
          setPasswordState({ message: "" });
        }, 5000);
      }
    };

    fetchPasswords();

    return () => {
      setPasswordState({ loading: true, message: "" });
      setPasswords({});
      setPasswordDeleted(!passwordDeleted);
    };
  }, [authTokens, value, setPasswords, passwordDeleted]);

  useEffect(() => {
    const fetchCards = async () => {
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
          setCardState({ loading: false, message: "" });
          setCards(response.data.data);
        } else {
          setCardState({
            loading: false,
            message: "Something went wrong!",
          });
          setTimeout(() => {
            setCardState({ message: "" });
          }, 5000);
        }
      } catch (error) {
        setCardState({
          loading: false,
          message: error.response.data.error,
        });
        setTimeout(() => {
          setCardState({ message: "" });
        }, 5000);
      }
    };

    fetchCards();

    return () => {
      setCardState({ loading: true, message: "" });
      setCards({});
      setCardDeleted(!cardDeleted);
    };
  }, [authTokens, value, setCards, cardDeleted]);

  const removePassword = (data) => {
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
        setPasswordDeleted(!passwordDeleted);
      });
  };

  const removeCard = (data) => {
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
      .then((res) => setCardDeleted(!cardDeleted));
  };

  return (
    <div className="mb-3 md:mb-6">
      <div className="mb-4 bg-gray-600 rounded-md p-4 flex items-center justify-between">
        <div className="flex rounded-xl bg-white flex-col items-center justify-center p-3">
          <h2 className="text-green-600 font-bold text-xl">Passwords</h2>
          <div>
            {passwords.length < 1 ? (
              <span>Start saving </span>
            ) : (
              <h1 className="font-bold text-black text-2xl">
                {passwords.length}
              </h1>
            )}
          </div>
        </div>
        <div className="flex rounded-xl bg-white flex-col items-center justify-center p-3">
          <h2 className="text-red-700 font-bold text-xl">Cards</h2>
          <div>
            {cards.length < 1 ? (
              <span>Start saving </span>
            ) : (
              <h1 className="font-bold text-black text-2xl">{cards.length}</h1>
            )}
          </div>
        </div>
      </div>
      <h1 className="text-lg md:text-2xl font-black text-gray-700 mb-3">
        All Credentials
      </h1>
      <h1 className="text-gray-700 text-lg font-bold">Passwords</h1>
      <div className="mb-4">
        {passwordState.loading && <Loading message="Fetching passwords..." />}
        {passwordState.message && (
          <div>
            <h1>Error while fetching data...</h1>
            <p>{passwordState.message}</p>
          </div>
        )}
        {passwords.length > 0 ? (
          <PasswordListing data={passwords} remove={removePassword} />
        ) : (
          <NoData
            heading="Empty List"
            message="You haven't kept any passwords yet"
          />
        )}
      </div>
      <h1 className="text-gray-700 text-lg font-bold">Cards</h1>
      <div className="mb-4">
        {cardState.loading && <Loading message="Fetching cards..." />}
        {cardState.message && (
          <div>
            <h1>Error while fetching data...</h1>
            <p>{cardState.message}</p>
          </div>
        )}
        {cards.length > 0 ? (
          <CardListing data={cards} remove={removeCard} />
        ) : (
          <NoData
            heading="Empty List"
            message="You haven't kept any cards yet"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
