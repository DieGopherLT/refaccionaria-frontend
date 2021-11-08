import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export default AxiosClient;
