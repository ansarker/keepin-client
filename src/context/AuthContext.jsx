import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [state, setState] = useState({ loading: false, message: "" });
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("__tokens__")
      ? JSON.parse(localStorage.getItem("__tokens__"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("__tokens__")
      ? jwt_decode(localStorage.getItem("__tokens__"))
      : null
  );

  let userSignin = async (username, password) => {
    setState({ loading: true, message: "" });
    try {
      let response = await axios.post(
        "/auth/signin",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let { data } = response;
      if (response.status === 200) {
        setState({ loading: false, message: "" });
        setAuthTokens(data);
        setUser(jwt_decode(data.access_token));
        localStorage.setItem("__tokens__", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setState({ message: "Something went wrong!" });
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

  let userSignup = async (user) => {
    setState({ loading: true, message: "" });
    try {
      let response = await axios.post("/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setState({ loading: false, message: "" });
        navigate("/signin");
      } else {
        setState({ message: "Something went wrong!" });
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

  let signOut = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.clear();
    navigate("/signin");
  };

  let updateToken = async () => {
    let response = await axios.post(
      "/auth/refresh",
      {
        refresh: authTokens.refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let { data } = response;
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access_token));
      localStorage.setItem("__tokens__", JSON.stringify(data));
    } else {
      signOut();
    }
  };

  useEffect(() => {
    let fiveMinutes = 1000 * 60 * 10;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fiveMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  let contextData = {
    state,
    user,
    authTokens,
    userSignin,
    signOut,
    userSignup,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
