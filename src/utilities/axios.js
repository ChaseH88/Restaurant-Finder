import axios from "axios";
import { async } from "q";

const axiosInstance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  timeout: 10000,
  headers: {"user-key": "e7965ed3b8d4f5d16ba953136daf09a5"}
});

const opencageInstance = axios.create({
  baseURL: 'https://api.opencagedata.com/geocode/v1',
  timeout: 10000,
  //headers: {"user-key": "e7965ed3b8d4f5d16ba953136daf09a5"}
});

let opencageKey = "80894e807146474bb4d97d785ecaefb2";

// meters in a mile = 1609.34;
export async function getLocation(lat, log, distance){
  if(!distance) distance = (1609.34 * 10) // default is 10 miles if none is selected.
  const data = await axiosInstance.get(`/search?count=40&lat=${lat}&lon=${log}&radius=${distance}&sort=real_distance`);
  if(data) return data;
}

export async function getRestaurant(id){
  const data = await axiosInstance.get(`/restaurant?res_id=${id}`);
  if(data) return data;
}

export async function getCuisines(lat, log){
  const data = await axiosInstance.get(`/cuisines?lat=${lat}&lon=${log}`);
  if(data) return data;
}

export async function getCityLocation(city, state){
  const data = await opencageInstance.get(`/json?q=${city}%2C%20${state}&key=${opencageKey}&language=en&pretty=1`);
  if(data) return data;
}

export async function filteredCitySearch(lat, log, distance, cuisines){
  let endpoint = (`/search?lat=${lat}&lon=${log}&radius=${distance}`);
  if(cuisines.length) endpoint += (`&cuisines=${cuisines}`)
  const data = await axiosInstance.get(endpoint);
  if(data) return data;
}