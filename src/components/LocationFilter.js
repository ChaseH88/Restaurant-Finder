import React, { Fragment, useEffect, useContext, useState } from "react";
import { Button, Card, Form, Menu } from "semantic-ui-react";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'

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
  });
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = ({ target: { name, value }}) => {
    setUserInput({
      ...userInput,
      [name]: value,
      distance: 5
    });
    console.log(userInput);
  }

  const handleSubmit = async () => {
    let { city, state, distance } = userInput;
    let cityData = null || await getCityLocation(city, state, distance);
    if(cityData){
      let { results } = cityData.data;
      setFoundLocations({
        ...foundLocations,
        locations: results
      });
      console.log(cityData.data)
    }
  }

  return(
    <Fragment>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='City Name' placeholder='' name="city" onChange={(e) => handleChange(e)} />
          <Form.Select fluid label='Select State' options={states} placeholder='Select' onChange={(e, { value }) => setUserInput({ ...userInput, "state": value })} />
        </Form.Group>
        {userInput.city && userInput.state &&
          <Form.Group>
            <Form.Input type="checkbox" label={showFilter ? `Hide Filters` : `Show Filters`} onChange={() => setShowFilter(!showFilter)} />
            <Slider style={{minWidth: "300px"}} min={1} max={25} value={userInput.distance} orientation='horizontal' onChange={(e) => setUserInput({ ...userInput, "distance": e })} name="distance" />
            <div className='value'>{userInput.distance} Miles</div>
          </Form.Group>
        }
        {showFilter &&
          <Form.Group>
            <Form.Input label="distance" type="range" name="distance" min="1" max="25" onChange={(e, { value }) => setUserInput({ ...userInput, "distance": value })} />
          </Form.Group>
        }
        <Form.Button>Search!</Form.Button>
      </Form>
      {foundLocations.locations &&
        <Menu vertical>
          {foundLocations.locations.map((loc) => {
          let {
            formatted,
            components: { city },
            geometry: { lat, lng }
          } = loc;
          return(
            <Menu.Item onClick={() => setData({ ...data, userLongitude: lng, userLatitude: lat })}>
              {formatted}
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