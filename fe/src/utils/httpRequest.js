import axios from 'axios';
import config from '~/config';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8888/',
});

httpRequest.interceptors.request.use(
    (config) => {
        const userData = localStorage.getItem('shopz-tm-user');
        if (userData) {
            const user = JSON.parse(userData);
            const token = user.token;
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export const get = async (path, option = {}) => {
    try {
        const response = await httpRequest.get(path, option);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response);

            return {
                error: true,
                message: error.response.data?.message || 'Lỗi không xác định từ server',
                status: error.response.status,
            };
        } else {
            console.error('GET request failed:', error.message);
            return { error: true, message: 'Lỗi kết nối tới server' };
        }
    }
};

export const post = async (path, data) => {
    try {
        const res = await httpRequest.post(path, data);
        return res;
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data?.message || 'Lỗi không xác định từ server',
                status: error.response.status,
            };
        } else {
            console.error('GET request failed:', error.message);
            return { error: true, message: 'Lỗi kết nối tới server' };
        }
    }
};

export const put = async (path, data) => {
    try {
        const res = await httpRequest.put(path, data);
        return res;
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data?.message || 'Lỗi không xác định từ server',
                status: error.response.status,
            };
        } else {
            console.error('GET request failed:', error.message);
            return { error: true, message: 'Lỗi kết nối tới server' };
        }
    }
};

export const patch = async (path, data) => {
    try {
        const res = await httpRequest.patch(path, data);
        return res;
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data?.message || 'Lỗi không xác định từ server',
                status: error.response.status,
            };
        } else {
            console.error('GET request failed:', error.message);
            return { error: true, message: 'Lỗi kết nối tới server' };
        }
    }
};

export const remove = async (path, data) => {
    try {
        const res = await httpRequest.delete(path, data);
        return res;
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data?.message || 'Lỗi không xác định từ server',
                status: error.response.status,
            };
        } else {
            console.error('GET request failed:', error.message);
            return { error: true, message: 'Lỗi kết nối tới server' };
        }
    }
};

httpRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        if (error.response && error.response.status === 403) {
            localStorage.removeItem('shopz-tm-user');
            window.location.href = config.routes.home;
        }
        return Promise.reject(error);
    },
);

export default httpRequest;
