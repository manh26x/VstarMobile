import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://api-vstar.vmo.group/',
    headers: {
        'content-type': 'application/json',
    }
})
export default axiosClient;
