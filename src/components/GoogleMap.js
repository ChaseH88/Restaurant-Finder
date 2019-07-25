import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export const GoogleMap = (props) => {
  console.log(props);
  return(
    <Map google={props.google} zoom={14}>
      <Marker name={'Current location'} />
      <InfoWindow>
        <div>
          <h1>{`Test`}</h1>
        </div>
      </InfoWindow>
    </Map>
  )
}
 
export default GoogleApiWrapper({
  apiKey: "1234433"
})(GoogleMap);