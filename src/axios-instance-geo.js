import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1"
});

export default instance;
