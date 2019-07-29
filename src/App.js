import React from 'react';
import { Route, Switch } from "react-router";
import './App.css';
import 'semantic-ui-css/semantic.min.css'

// Components
import PageLayout from "../src/components/PageLayout";
import AppContext from "../src/components/Context";
import GetLocation from './components/GetLocation';
import RestaurantDetails from './components/RestaurantDetails';

import LocationFilter from "./components/LocationFilter";

function App(props) {
  return (
    <AppContext>
      <Switch>
        <PageLayout>
          <Route exact key="/" path="/" component={LocationFilter} />
          <Route exact key="/restaurant/:id" path="/restaurant/:id" component={RestaurantDetails} />
        </PageLayout>
      </Switch>
    </AppContext>
  );
}

export default App;
