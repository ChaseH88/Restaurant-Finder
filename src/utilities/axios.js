import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  timeout: 10000,
  headers: {"user-key": "e7965ed3b8d4f5d16ba953136daf09a5"}
});

export async function getLocation(lat, log){
  const data = await axiosInstance.get(`/geocode?lat=${lat}&lon=${log}`);
  return data;
}

export async function getRestaurant(id){
  const data = await axiosInstance.get(`/restaurant?res_id=${id}`);
  return data;
}