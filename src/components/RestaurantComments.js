import React from "react";
import { Comment } from "semantic-ui-react";
const RestaurantComments = ({ reviews }) => (
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
)

export default RestaurantComments;