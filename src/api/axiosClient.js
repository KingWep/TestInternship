import axios from 'axios';
import { env } from '../config/env';
import setupInterceptors from './interceptors';
const axiosClient = axios.create({
    baseURL : env.APP_API_URL,
    timeout : env.TIMEOUT,
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
    }
})

setupInterceptors(axiosClient);
export default axiosClient;