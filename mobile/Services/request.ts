import axios, {AxiosRequestConfig} from 'axios';
import {apiEndPoint} from "@/Services/Axios";

export const get = async (url: string, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.get(apiEndPoint(url), config);
}

export const post = async (url: string, data: Record<string, any>, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.post(apiEndPoint(url), data, config);
}

export const put = async (url: string, data: Record<string, any>, config?: AxiosRequestConfig) => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    return axios.put(apiEndPoint(url), data, config);
};


