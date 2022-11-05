import axios from "axios";

export default axios.create({
  baseURL: "https://spring-store-api.herokuapp.com",
});