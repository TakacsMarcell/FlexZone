import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import React from 'react';
import { useEffect } from "react";
import { updateUserRequestToken } from "./requestMethods"; 
import { GlobalStyle } from "./GlobalStyles"; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    updateUserRequestToken();
  }, []);
  
  const user = useSelector(state => state.user.currentUser);
  
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          {user ? (
            <>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
