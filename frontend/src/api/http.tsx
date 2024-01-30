import { AxiosRequestConfig } from "axios"
import api from "./axiosConfig"

export interface IHttpClient {
    get<T>(url: string, headers?: Headers): Promise<T>
    post<T, P>(url: string, payload?: P, headers?: Headers): Promise<T>
}

export interface Headers {
    contentType?: string
}

export class AxiosHttpClient implements IHttpClient {

    getOptions(headers?: Headers): AxiosRequestConfig {
        const options: AxiosRequestConfig = {
            headers: {}
        }
        options.headers!["X-CSRF-TOKEN"] = `Bearer ${localStorage.getItem("crsf")}`;

        if (headers) {
            if (headers.contentType) {
                options.headers!["Content-Type"] = headers.contentType;
            }
        }

        return options
    }

    async post<T, P>(url: string, payload?: P, headers?: Headers): Promise<T> {
        const options = this.getOptions(headers);

        return api.post(url, payload, options)
    }

    async get<T>(url: string, headers?: Headers): Promise<T> {
        const options = this.getOptions(headers)

        return api.get(url, options)
    }
}

export const http = new AxiosHttpClient()