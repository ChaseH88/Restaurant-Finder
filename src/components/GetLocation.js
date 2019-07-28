import React, { Fragment, useEffect, useContext, useState } from "react";
import { Button, Card } from "semantic-ui-react";

import RestaurantList from "./RestaurantList";
import { Context } from "./Context";

// Utilities
import { getLocation } from "../utilities/axios";
import RestaurantListItem from "./RestaurantListItem";

// This will set the context when clicked by the user
const GetLocation = (props) => {
  const { data, setData } = useContext(Context);
  const [result, setResult] = useState(false);
  const [temp, setTemp] = useState(false);
  
  useEffect(() => {
    if(data.userLongitude && data.userLatitude) setResult(true);
    return;
  }, []);

  const getGeolocation = async () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(location) {
        setData({
          ...data,
          userLongitude: location.coords.longitude,
          userLatitude: location.coords.latitude,
        });
        console.log(data);
      }, (err) => {
        if(err.code == err.PERMISSION_DENIED){
          alert(`APP ERROR: ${err.message}`);
        }
      });
      setResult(true);
    } else {
      alert("Geolocation services are not supported by your browser.")
    }
  }

  if(!result && data.userLongitude === null){
    return(
        <Button
          onClick={() => getGeolocation()}
          content="Get Location!"
          icon="location arrow"
          labelPosition="right"
          color="green"
        />
    )
  } else {
    return <RestaurantList data={data} />
  }

}

export default GetLocation;