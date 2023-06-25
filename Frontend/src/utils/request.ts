import axios, {AxiosRequestConfig} from 'axios';

export const apiEndPoint = (endPoint: string) => {
    const baseUrl = 'http://localhost:8000/api';

    return `${baseUrl}${endPoint}`;
}

const post = async (url: string, data: Record<string, any>, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.post(apiEndPoint(url), data, config);
}

const get = async (url: string, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.get(apiEndPoint(url), config);
}

const put = async (url: string, data: Record<string, any>, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.put(apiEndPoint(url), data, config);
};

export const HttpClient = {post, get, put};

