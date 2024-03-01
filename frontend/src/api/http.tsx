import { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from "axios"
import api from "./axiosConfig"
import { ConsumerReportPermissiblePurpose } from "plaid"

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
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest: AxiosRequestConfig = error.config as AxiosRequestConfig;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true; // Marking that we've already tried refreshing the token

                    try { // TODO: clean this all up
                        const { data } = await api.post('/users/refresh', {}, { withCredentials: true });

                        localStorage.setItem('csrf', data);

                        return api(originalRequest);
                    } catch (refreshError) {
                        console.log("Failed to refreshs token");
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
http.initializeResponseInterceptor();
