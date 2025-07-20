import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8888/',
});

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path, data) => {
    const res = await httpRequest.post(path, data);
    return res;
};

export default httpRequest;
