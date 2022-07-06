import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "./Constants";



const axiosClient = axios.create({
    baseURL: Constants.BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
});
axios.interceptors.response.use(function (response) {
    throw new axios.Cancel('Operation canceled by the user.');
}, function (error) {
    return Promise.reject(error);
});


setInterval(async () => {
    let username = await SecureStore.getItemAsync('user_name');
    if(username !== '') {
        axiosClient.post('/user/refresh-token', {username: username, password: 'a'},{headers: {refresh_token: `${await SecureStore.getItemAsync('refresh_token')}`,
                'Content-Type': 'application/json',}}).then(async (res: any) => {
            await SecureStore.setItemAsync('refresh_token', res.refresh_token);
            await SecureStore.setItemAsync('access_token', res.access_token);
        }).catch(err => {
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
axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
})

axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
})

export default axiosClient;
