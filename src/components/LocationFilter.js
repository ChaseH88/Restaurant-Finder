import React, { Fragment, useEffect, useContext, useState } from "react";
import { Button, Card, Form, Menu } from "semantic-ui-react";

// App Context
import { Context } from "./Context";

// Utilities
import { getCityLocation } from "../utilities/axios";
import { states } from "../utilities/states";
import GetLocation from "./GetLocation";


// This will set the context when clicked by the user
const LocationFilter = (props) => {
  const { data, setData } = useContext(Context);
  const [result, setResult] = useState(false);
  const [userInput, setUserInput] = useState({});
  const [foundLocations, setFoundLocations] = useState({
    selected: null,
    locations: null
  })

  const handleChange = ({ target: { name, value }}) => {
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const handleSubmit = async () => {
    let { city, state } = userInput;
    let cityData = null || await getCityLocation(city, state);
    if(cityData){
      let { results } = cityData.data;
      setFoundLocations({
        ...foundLocations,
        locations: results
      });
    }
  }

  return(
    <Fragment>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='City Name' placeholder='' name="city" onChange={(e) => handleChange(e)} />
          <Form.Select fluid label='Select State' options={states} placeholder='Select' onChange={(e, { value }) => setUserInput({ ...userInput, "state": value })} />
        </Form.Group>
        <Form.Button>Search!</Form.Button>
      </Form>
      {foundLocations.locations &&
        <Menu vertical>
          {foundLocations.locations.map((loc) => {
          let {
            components: { city, state, postcode },
            geometry: { lat, lng }
          } = loc;
          return(
            <Menu.Item onClick={() => setData({ ...data, userLongitude: lng, userLatitude: lat })}>
              {`${city && city}, ${postcode && postcode}, ${state && state}`}
            </Menu.Item>
          )
        })}
        </Menu>
      }
      <GetLocation />
    </Fragment>
  )

}

export default LocationFilter;