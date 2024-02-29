import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
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
        options.headers!["X-CSRF-TOKEN"] = `Bearer ${localStorage.getItem("csrf")}`;

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

    initializeResponseInterceptor(): void {
        api.interceptors.response.use(
            (response: AxiosResponse) => response, // This function handles successful responses
            async (error: AxiosError) => {
                const originalRequest: AxiosRequestConfig = error.config as AxiosRequestConfig;

                // Check if the error is due to an expired access token
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true; // Marking that we've already tried refreshing the token

                    try {
                        // Attempt to get a new access token by calling the refresh endpoint
                        const { data } = await api.post('/users/refresh', {}, { withCredentials: true });
                        const newAccessToken = data.accessToken; // Adjust based on your API response

                        // Update the authorization header with the new token
                        if (api.defaults.headers && newAccessToken) {
                            api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                        }

                        // Retry the original request with the new token
                        return api(originalRequest);
                    } catch (refreshError) {
                        console.error('Unable to refresh token', refreshError);
                        return Promise.reject(refreshError);
                    }
                }

                // For errors other than 401, just return the error
                return Promise.reject(error);
            }
        );

    }
}

export const http = new AxiosHttpClient()