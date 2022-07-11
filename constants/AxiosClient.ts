import Axios from  'axios-observable';
import * as SecureStore from "expo-secure-store";
import Constants from "./Constants";



const axiosClient = Axios.create({
    baseURL: Constants.BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
});

setInterval(async () => {
    let refresh_token = Constants.REFRESH_TOKEN;
    if(refresh_token !== '') {
        axiosClient.post('/user/refresh-token', {},{headers: {refresh_token: `${Constants.REFRESH_TOKEN}`}}).subscribe(async (res: any) => {
            Constants.REFRESH_TOKEN = res.refresh_token;
            Constants.ACCESS_TOKEN = res.access_token;
        },() => {
            Constants.ACCESS_TOKEN = '';
        }, () => {});
    }

}, 60000);
// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    }
    , error => {
        console.error(JSON.stringify(error));
        return Promise.reject(error)
    }
);

export default axiosClient;
