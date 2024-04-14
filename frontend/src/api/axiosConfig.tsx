import axios from "axios";

export default axios.create({
  baseURL: "http://13.40.99.97:8000/",
  withCredentials: true,
});
