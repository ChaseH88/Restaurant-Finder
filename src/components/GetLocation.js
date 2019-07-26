import React, { Fragment, useContext, useState } from "react";
import { Button, Card } from "semantic-ui-react";

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
    let locationData = await getLocation(data.userLatitude, data.userLongitude);
    if(locationData) {
      setTemp(locationData);
      setResult(true);
    }
  }

  const renderResult = () => {
    let { nearby_restaurants } = temp.data;
    let res = nearby_restaurants.map(({ restaurant }) => restaurant);
    return(
      <Card.Group itemsPerRow={3} textAlign={"center"}>
        {res.map((r, index) => {
          return(<ShowResult key={index} data={r} color={index % 2 !== 1 ? "odd" : "even"} />)
        })}
      </Card.Group>
    );
  }

  return(
    <Fragment>
      <Button
        onClick={() => getGeolocation()}
        content="Get Location!"
        icon="location arrow"
        labelPosition="right"
        color="green"
      />
      {result && renderResult()}
    </Fragment>
  )
}

export default GetLocation;