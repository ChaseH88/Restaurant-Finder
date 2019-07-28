import React, { useState, useEffect } from "react";
import { Comment, Button, Rating, Segment, Container, Header, Icon, Image, Dimmer, Loader, Modal, Grid, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Utilities
import { getRestaurant } from "../utilities/axios";

// Components
import RestaurantComments from "./RestaurantComments";
import RestaurantPhotos from "./RestaurantPhotos";

const TwoCol = styled.div`
  display: flex;
  flex-wrap: nowrap;
  & > div {
    &.left {
      flex: 1 1 66%;
      padding: 0 20px 0 0;
    }
    &.right {
      flex: 1 1 33%;  
    }
  }
`;

const RestaurantDetails = ({ history, match: { params } }) => {
  let { id } = params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    (async function getData(){
      let result = await getRestaurant(id);
      setDetails(result);
    })();
  }, []);

  const calcButtonColor = (rating) => {
    let color, rate = Math.floor(rating);
    rate > 3 && (color = "green");
    rate === 3 && (color = "teal");
    rate < 3 && (color = "red");
    rating === 0 && (color = "")
    return color;
  }

  const calcButtonIcon = (rating) => {
    let rate = Math.floor(rating);
    if(rate >= 3) return "thumbs up";
    if(rate < 3 && rate > 0) return "thumbs down";
    if(rating === 0) return "question";
  }
  
  if(details){
    let {
      data: {
        name,
        cuisines,
        featured_image,
        highlights,
        photos,
        timings,
        phone_numbers,
        all_reviews: { reviews },
        user_rating: { aggregate_rating, rating_text },
        location: { address, locality, city, latitude, longitude, zipcode }
      }
    } = details;
    return(
      <Container>
        <Header as='h1' icon textAlign='center'>
          {featured_image.length > 0 ?
            <Image src={featured_image} size='large' circular /> :
            <Icon name='food' circular />
          }
          <Header.Content>{name}</Header.Content>
        </Header>
        <Segment secondary raised>
          <span style={{fontWeight: "700", fontStyle: "italic"}}>
            {`${address}, ${city} (${locality}), ${zipcode}`}<br />
            <a href={`tel:${phone_numbers}`}>
              <Icon name="phone" />{phone_numbers}
            </a>
          </span>
          {timings}
        </Segment>
        <TwoCol>
          <div className="left">
            <Segment raised>
              <Header as="h3">
                {cuisines}
                <Icon name="food" />
              </Header>
              <Menu stackable className="highlightMenu">
                {highlights.map(highlight => 
                  <Menu.Item key={`highlight-${highlight}`}>{highlight}</Menu.Item>
                )}
              </Menu>
              {photos && <RestaurantPhotos photos={photos} />}
            </Segment>
          </div>
          <div className="right">
            <Segment raised>
              <Header>Comments &amp; Reviews</Header>
              <Rating size="massive" disabled={true} icon='star' defaultRating={aggregate_rating} maxRating={5} />
              <br />
              <Button
                color={calcButtonColor(aggregate_rating)}
                icon={calcButtonIcon(aggregate_rating)}
                content={rating_text}
              />
              <RestaurantComments reviews={reviews} />
            </Segment>
          </div>
        </TwoCol>
      </Container>
    );
  } else {
    return(
      <Dimmer active>
        <Loader size='big'>Loading</Loader>
      </Dimmer>
    )
  }
}

export default RestaurantDetails;