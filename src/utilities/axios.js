import axios from "axios";

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

export async function getLocation(lat, log){
  const data = await axiosInstance.get(`/search?count=40&lat=${lat}&lon=${log}&radius=16093.4&sort=real_distance`);
  if(data) return data;
}

export async function getRestaurant(id){
  const data = await axiosInstance.get(`/restaurant?res_id=${id}`);
  if(data) return data;
}

export async function getCityLocation(city, state){
  const data = await opencageInstance.get(`/json?q=${city}%2C%20${state}&key=${opencageKey}&language=en&pretty=1`);
  if(data) return data;
}