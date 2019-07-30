import React, { Fragment, useEffect, useContext, useState } from "react";
import { Menu, Form, Button, Segment, Grid, Divider } from "semantic-ui-react";
import Slider from 'react-rangeslider';
import { Context } from "./Context";

// Utilities
import { getLocation, getCityLocation, getCuisines, filteredCitySearch } from "../utilities/axios";
import { states } from "../utilities/states";

// Components
import RestaurantListItem from "./RestaurantListItem";
import RestaurantList from "./RestaurantList";

// This will set the context when clicked by the user
const GetLocation = (props) => {
  const { data, setData } = useContext(Context);
  const [result, setResult] = useState(false);
  const [temp, setTemp] = useState(false);
  const [userInput, setUserInput] = useState({});
  const [foundLocations, setFoundLocations] = useState({
    selected: null,
    locations: null
  });
  const [showFilter, setShowFilter] = useState(false);
  const [cuisineList, setCuisineList] = useState([]);

  useEffect(() => {
    if(data.userLongitude && data.userLatitude) setResult(true);
    return;
  }, []);

  const getGeolocation = async () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(location) {
        setData({
          ...data,
          userLongitude: location.coords.longitude,
          userLatitude: location.coords.latitude,
        });
        console.log(data);
      }, (err) => {
        if(err.code == err.PERMISSION_DENIED){
          alert(`APP ERROR: ${err.message}`);
        }
      });
      setResult(true);
    } else {
      alert("Geolocation services are not supported by your browser.")
    }
  }

  const handleChange = ({ target: { name, value }}) => {
    setUserInput({
      ...userInput,
      [name]: value,
      distance: 5,
      cuisineArr: []
    });
    console.log(userInput);
  }

  const handleSubmit = async () => {
    let { distance, cuisineArr } = userInput;
    let { latitude, longitude } = temp;
    let cityData = await filteredCitySearch(latitude, longitude, distance, cuisineArr);
    if(cityData){
      let { results } = cityData.data;
      setFoundLocations({
        ...foundLocations,
        locations: results
      });
      setResult(true);
    }
  }

  const handleFilter = async () => {
    if(showFilter) return;
    let { city, state } = userInput;
    let cityData = null || await getCityLocation(city, state);
    let { lat, lng } = cityData.data.results[0].geometry;
    let cuisineData = null || await getCuisines(lat, lng);
    let { cuisines } = cuisineData.data;
    setTemp({
      ...temp,
      longitude: lng,
      latitude: lat
    });
    setCuisineList(cuisines);
    setShowFilter(!showFilter);
  }

  const showCuisineList = () => {
    if(!cuisineList.length) return;
    return(
      <div style={{height: "200px", overflowX: "hidden"}}>
        {cuisineList.map(({ cuisine }) => {
        return(
          <Form.Input type="checkbox" key={cuisine.cuisine_id} value={cuisine.cuisine_id} fluid label={`${cuisine.cuisine_name}`} onChange={(e) => handleCuisineChange(e)} />
        )
        })}
      </div>
    )
  }

  const handleCuisineChange = (e) => {
    let { value } = e.target;
    let found = userInput.cuisineArr.find((id) => (id === value));
    if(found){
      let filteredArr = userInput.cuisineArr.filter(id => id !== value);
      setUserInput({
        ...userInput,
        cuisineArr: filteredArr
      });
    } else {
      setUserInput({
        ...userInput,
        cuisineArr: [...userInput.cuisineArr, value]
      });
    }
  }

  if(!result && data.userLongitude === null){
    return(
        <Segment>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <h2>Get Current Location!</h2>
              <Button onClick={() => getGeolocation()} content="Get Location!" icon="location arrow" labelPosition="right" color="green" />
            </Grid.Column>
            <Grid.Column>
            <Fragment>
              <Form onSubmit={() => handleSubmit()} style={{maxWidth: "275px", margin: "0 auto"}}>
                <h2>Enter Location!</h2>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='City Name' placeholder='' name="city" onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Select fluid label='Select State' options={states} placeholder='Select' onChange={(e, { value }) => setUserInput({ ...userInput, "state": value })} />
                </Form.Group>
                {userInput.city && userInput.state &&
                  <Form.Group>
                    <Form.Input type="checkbox" label={showFilter ? `Hide Filters` : `Show Filters`} onChange={() => handleFilter()} />
                  </Form.Group>
                }
                {userInput.city && userInput.state &&
                  <Form.Button>Search!</Form.Button>
                }
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
            </Fragment>
            </Grid.Column>
            {showFilter &&
              <Grid.Column>
                <Form.Group>
                  <Slider style={{minWidth: "300px"}} min={1} max={25} value={userInput.distance} orientation='horizontal' onChange={(e) => setUserInput({ ...userInput, "distance": e })} name="distance" />
                    <div className='value'>{userInput.distance} Miles</div>
                </Form.Group>
                <Form.Group>
                  {showCuisineList()}
                </Form.Group>
              </Grid.Column>
            }
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
    )
  } else {
    return <RestaurantList data={data} />
  }

}

export default GetLocation;