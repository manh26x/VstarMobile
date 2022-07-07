import axios from "axios";
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
    let username = await SecureStore.getItemAsync('user_name');
    if(username !== '') {
        axiosClient.post('/user/refresh-token', {username: username, password: 'a'},{headers: {refresh_token: `${await SecureStore.getItemAsync('refresh_token')}`,
                'Content-Type': 'application/json',}}).subscribe(async (res: any) => {
            await SecureStore.setItemAsync('refresh_token', res.refresh_token);
            await SecureStore.setItemAsync('access_token', res.access_token);
        },err => {
            SecureStore.setItemAsync('access_token', '');
        });
    }

}, 30000);
// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data
    }
    , error => {
        console.error( error.response);
        return Promise.reject(error)
    }
);

export default axiosClient;
