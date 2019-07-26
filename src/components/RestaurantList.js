import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Card } from "semantic-ui-react";
import { getLocation } from "../utilities/axios";

// Components
import ShowResult from "./ShowResult";

const RestaurantList = ({ data }) => {
  const { userLatitude, userLongitude } = data;
  const [restaurants, setRestaurants] = useState(null);
  useEffect(() => {
    if(userLatitude !== null && userLongitude !== null){
      (async function getData(){
        let result = await getLocation(userLatitude, userLongitude);
        setRestaurants(result);
        return;
      })();
    }
  }, [data]);

  if(restaurants){
    let { nearby_restaurants } = restaurants.data;
    let res = nearby_restaurants.map(({ restaurant }) => restaurant);
    return(
      <Card.Group itemsPerRow={3} textAlign={"center"}>
        {res.map((r, index) => {
          return(<ShowResult key={index} data={r} color={index % 2 !== 1 ? "odd" : "even"} />)
        })}
      </Card.Group>
    );
  } else {
    return(
      <Dimmer active>
        <Loader size='big'>Loading</Loader>
      </Dimmer>
    )
  }
}

export default RestaurantList;