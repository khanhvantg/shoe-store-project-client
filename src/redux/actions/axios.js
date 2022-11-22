import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8088",
  baseURL: "https://spring-store-api.herokuapp.com"
});