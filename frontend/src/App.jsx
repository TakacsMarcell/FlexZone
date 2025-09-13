import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import React from 'react';
import { GlobalStyle } from "./GlobalStyles"; 
import Cart from "./pages/Cart";
import WebShop from "./pages/Webshop";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Nutrition from "./pages/Nutrition";
import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
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
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>

          {user ? (
            <>
              <Route path="/products/:category">
                <ProductList />
              </Route>
              <Route path="/product/:id">
                <Product />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/webshop">
                <WebShop />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/taplalkozas">
                <Nutrition />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
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
