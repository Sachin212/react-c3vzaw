import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const BaseRouter = () => {
  return (
    <Router>
      <HomePage />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        //Here change it to dynamic username
        <Route path="/users">
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default BaseRouter;
