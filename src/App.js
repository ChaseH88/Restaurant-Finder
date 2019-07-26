import React from 'react';
import { Route, Switch } from "react-router";
import './App.css';
import 'semantic-ui-css/semantic.min.css'

// Components
import AppContext from "../src/components/Context";
import GetLocation from './components/GetLocation';
import RestaurantDetails from './components/RestaurantDetails';

function App(props) {
  return (
    <AppContext>
      <Switch>
        <Route exact key="/" path="/" component={GetLocation} />
        <Route exact key="/restaurant/:id" path="/restaurant/:id" component={RestaurantDetails} />
      </Switch>
    </AppContext>
  );
}

export default App;
