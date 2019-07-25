import React, { useContext } from "react";
import { Button } from "semantic-ui-react";

import { Context } from "./Context";

// This will set the context when clicked by the user
const GetLocation = () => {
  const { data, setData } = useContext(Context);

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function(location) {
      setData({
        ...data,
        userLongitude: location.coords.longitude,
        userLatitude: location.coords.latitude,
      });
    });
  }

  return <Button
          onClick={() => getGeolocation()}
          content="Get Location!"
          icon="location arrow"
          labelPosition="right"
          color="green"
        />;

}

export default GetLocation;