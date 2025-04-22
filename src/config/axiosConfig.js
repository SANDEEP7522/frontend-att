// here we will create axios instance with base url

import axios from 'axios';


export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL
});