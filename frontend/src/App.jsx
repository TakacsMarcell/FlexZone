import Home from "./pages/Home";
import React from 'react';
import { useEffect } from "react";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const App = () => {
  useEffect(() => {
    
  }, []);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;