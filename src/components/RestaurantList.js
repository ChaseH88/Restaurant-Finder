import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Card } from "semantic-ui-react";
import { getLocation } from "../utilities/axios";

// Components
import RestaurantListItem from "./RestaurantListItem";

const RestaurantList = ({ data }) => {
  const { userLatitude, userLongitude } = data;
  const [restaurantsData, setRestaurantsData] = useState(null);

  useEffect(() => {
    if(userLatitude !== null && userLongitude !== null){
      (async function getData(){
        let result = await getLocation(userLatitude, userLongitude);
        setRestaurantsData(result);
        return;
      })();
    }
  }, [data]);

  if(restaurantsData){
    let { restaurants } = restaurantsData.data;
    let res = restaurants.map(({ restaurant }) => restaurant);
    return(
      <Card.Group itemsPerRow={3} textAlign={"center"}>
        {res.map((r, index) => {
          return(<RestaurantListItem key={index} data={r} color={index % 2 !== 1 ? "odd" : "even"} />)
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