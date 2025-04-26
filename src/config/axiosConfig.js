// here we will create axios instance with base url

import axios from 'axios';


export default axios.create({
    baseURL: "https://backend-att.onrender.com/api/v1",
    withCredentials: true,
});