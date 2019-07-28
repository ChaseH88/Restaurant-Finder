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
          <Link to="/">
          <Button color="blue" icon labelPosition='left'>
            <Icon name='home' />
            Home
          </Button>
          </Link>
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
                  <Menu.Item>{highlight}</Menu.Item>
                )}
              </Menu>
              <RestaurantPhotos photos={photos} />
            </Segment>
          </div>
          <div className="right">
            <Segment raised>
              <Header>Comments &amp; Reviews</Header>
              <Rating size="massive" disabled={true} icon='star' defaultRating={aggregate_rating} maxRating={5} />
              <br />
              <Button
                color={Math.floor(aggregate_rating) >= 3 ? "green" : "red"}
                icon={Math.floor(aggregate_rating) >= 3 ? "thumbs up" : "thumbs down"}
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