import React, { useState, useEffect } from "react";
import { Comment, Button, Rating, Segment, Container, Header, Icon, Image, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";

// Utilities
import { getRestaurant } from "../utilities/axios";

const TwoCol = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  & > div {
    &.left {
      flex: 1 1 66%;  
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

  const getDetails = (id) => {
    console.log(id);
    return null
  }
  
  if(details){
    let {
      data: {
        name,
        cusines,
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
    console.log(reviews);
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
          <span style={{fontWeight: "700", fontStyle: "italic"}}>{`${address}, ${city}, ${zipcode}`}</span>
        </Segment>
        <TwoCol>
          <div className="left">
            left
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
              <Comment.Group style={{maxWidth: "none"}}>
                {reviews.map(({ review: { id, rating_text, review_text, review_time_friendly, user } }) => {
                  return(
                    <React.Fragment key={id}>
                      <Comment>
                        <Comment.Content>
                          <Comment.Avatar src={user.profile_image} as="a" href={user.profile_url} />
                            {rating_text.toLowerCase() !== "not rated" &&
                              <Comment.Text as="h3">
                                {rating_text}
                              </Comment.Text>
                            }
                        </Comment.Content>
                        <Comment.Content>
                          <Comment.Author as='a' href={user.profile_url}>
                              {user.name}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{review_time_friendly}</div>
                          </Comment.Metadata>
                          <Comment.Text>{review_text}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                      <hr />
                    </React.Fragment>
                  )
                })}
              </Comment.Group>
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