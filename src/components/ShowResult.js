import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { Button, Card, Image, Rating } from 'semantic-ui-react'
import { Redirect } from "react-router";

const ShowResult = ({ color, data }) => {

  const [redirect, setRedirect] = useState(false);

  let {id, name, average_cost_for_two, cuisines, thumb, photos_url,
    user_rating: { aggregate_rating, rating_text },
    location: { city, state, locality, address, latitude, longitude, zipcode }
  } = data;

  const handleSeeMore = (id) => {
    setRedirect(true);
  }

  return(
    <Card>
      <Card.Content>
        {thumb !== "" &&
          <a target="_blank" href={photos_url}>
            <Image floated='right' size='mini' src={thumb} />
          </a>
        }
        <Card.Header>{name}</Card.Header>
        <Card.Meta><p><em>{address},</em> {city}</p></Card.Meta>
        <Card.Description>
        <p>Average Cost for Two: <strong>{average_cost_for_two !== 0 ? average_cost_for_two : "?"}</strong></p>
        <Rating disabled={true} icon='star' defaultRating={aggregate_rating} maxRating={5} />
        <Button size="mini" color="black" onClick={() => setRedirect(true)}>See More</Button>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {cuisines}
      </Card.Content>
      {redirect && <Redirect to={`/restaurant/${id}`} />}
    </Card>
  )
}

export default ShowResult;