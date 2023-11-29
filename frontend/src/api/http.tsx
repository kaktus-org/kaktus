import { AxiosRequestConfig } from "axios"
import api from "./axiosConfig"

export interface IHttpClient {
    get<T>(url: string, requiresToken: boolean, headers?: Headers): Promise<T>
    post<T, P>(url: string, requiresToken: boolean, payload?: P, headers?: Headers): Promise<T>
}

export interface Headers {
    contentType?: string
}

export class AxiosHttpClient implements IHttpClient {

    getOptions(requiresToken: boolean, headers?: Headers): AxiosRequestConfig {
        const options: AxiosRequestConfig = {
            headers: {}
        }

        if (requiresToken) {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                options.headers!['Authorization'] = `Bearer ${token}`;
            } else {
                throw new Error('Authentication token not found');
            }
        }

        if (headers) {
            if (headers.contentType) {
                options.headers!["Content-Type"] = headers.contentType;
            }
        }

        return options
    }

    async post<T, P>(url: string, requiresToken = false, payload?: P, headers?: Headers): Promise<T> {
        const options = this.getOptions(requiresToken, headers);

        return api.post(url, payload, options)
    }

    async get<T>(url: string, requiresToken = false, headers?: Headers): Promise<T> {
        const options = this.getOptions(requiresToken, headers)

        return api.get(url, options)
    }
}

export const http = new AxiosHttpClient()