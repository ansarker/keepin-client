import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import axios from "axios";
import { api } from "../config/config";
import SearchProvider from "../context/SearchProvider";
import Main from "./Main";

axios.defaults.baseURL = api;

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Main />
      </Router>
    </SearchProvider>
  );
};

export default App;
