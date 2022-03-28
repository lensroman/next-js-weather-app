import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1",
  params: {
    key: "4c4cea6d3c944752a6f0c6e67aee3033",
  }
});

export default instance;
