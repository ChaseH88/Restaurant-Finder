import React from "react";

const RestaurantDetails = ({ history, match: { params } }) => {
  let { id } = params;
  return(
    <p>{id}</p>

  )
}

export default RestaurantDetails;