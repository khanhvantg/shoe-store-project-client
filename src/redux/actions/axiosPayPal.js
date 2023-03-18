import axios from "axios"
export default axios.create({
    baseURL: "https://api-m.sandbox.paypal.com"
});