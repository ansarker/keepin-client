import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Profile from "./auth/Profile";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Dashboard from "./credentials/Dashboard";
import Favorites from "./credentials/Favorites";
import NotFound from "./libs/NotFound";
import Wrapper from "./libs/Wrapper";
import PrivateRoute from "./routing/PrivateRoute";
import PasswordListing from "./credentials/passwords/PasswordListing";
import PasswordDetails from "./credentials/passwords/PasswordDetails";
import CardListing from "./credentials/cards/CardListing";
import CardDetails from "./credentials/cards/CardDetails";

const Main = () => {
  return (
    <div className="lg:absolute lg:left-60 lg:right-60">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Wrapper>
                  <Dashboard />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Wrapper>
                  <Profile />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="passwords"
            element={
              <PrivateRoute>
                <Wrapper>
                  <PasswordListing />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="passwords/:detailId"
            element={
              <PrivateRoute>
                <Wrapper>
                  <PasswordDetails />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="cards"
            element={
              <PrivateRoute>
                <Wrapper>
                  <CardListing />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="cards/:detailId"
            element={
              <PrivateRoute>
                <Wrapper>
                  <CardDetails />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Wrapper>
                  <Favorites />
                </Wrapper>
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default Main;
