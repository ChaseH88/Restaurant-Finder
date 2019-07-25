import React, { Fragment, useContext } from "react";
import styled from "styled-components";

// Utilities
import { getLocation } from "../utilities/axios";

// Components
import { Context } from "../components/Context";

const ShowResult = () => {
  
  const { data: { userLatitude, userLongitude } } = useContext(Context);

  const loadData = async () => {
    if(userLatitude === null || userLongitude === null) return null;
    let locationData = await getLocation(userLatitude, userLongitude);
    locationData.then(({ data }) => {
      let { link, location, nearby_restaurants, popularity } = data;
      console.log(nearby_restaurants);
    });
    console.log(locationData);
  }

  return loadData();
}

export default ShowResult;