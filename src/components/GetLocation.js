import React, { Fragment, useContext, useState } from "react";
import { Button, Card } from "semantic-ui-react";

import RestaurantList from "./RestaurantList";
import { Context } from "./Context";

// Utilities
import { getLocation } from "../utilities/axios";
import ShowResult from "./ShowResult";

// This will set the context when clicked by the user
const GetLocation = () => {
  const { data, setData } = useContext(Context);
  const [result, setResult] = useState(false);
  const [temp, setTemp] = useState(false);
  
  const getGeolocation = async () => {
    navigator.geolocation.getCurrentPosition(function(location) {
      setData({
        ...data,
        userLongitude: location.coords.longitude,
        userLatitude: location.coords.latitude,
      });
    });
    setResult(true);
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