import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8888/',
});

export const get = async (path, option = {}) => {
    try {
        const response = await httpRequest.get(path, option);
        return response.data;
    } catch (error) {
        console.error('GET request failed:', error.message);
        return { error: true, message: 'Lỗi kết nối tới server' };
    }
};

export const post = async (path, data) => {
    try {
        const res = await httpRequest.post(path, data);
        return res;
    } catch (error) {
        console.error('GET request failed:', error.message);
        return { error: true, message: 'Lỗi kết nối tới server' };
    }
};

export const put = async (path, data) => {
    try {
        const res = await httpRequest.post(path, data);
        return res;
    } catch (error) {
        console.error('GET request failed:', error.message);
        return { error: true, message: 'Lỗi kết nối tới server' };
    }
};

export const patch = async (path, data) => {
    try {
        const res = await httpRequest.post(path, data);
        return res;
    } catch (error) {
        console.error('GET request failed:', error.message);
        return { error: true, message: 'Lỗi kết nối tới server' };
    }
};

export const deleted = async (path, data) => {
    try {
        const res = await httpRequest.post(path, data);
        return res;
    } catch (error) {
        console.error('GET request failed:', error.message);
        return { error: true, message: 'Lỗi kết nối tới server' };
    }
};

export default httpRequest;
