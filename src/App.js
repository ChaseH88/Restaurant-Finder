import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

// Components
import AppContext from "../src/components/Context";
import GetLocation from './components/GetLocation';
import GoogleMap from './components/GoogleMap';
import ShowResult from './components/ShowResult';

function App() {
  return (
    <AppContext>
      <GetLocation />
      {/* <GoogleMap /> */}
      <ShowResult />
    </AppContext>
  );
}

export default App;
