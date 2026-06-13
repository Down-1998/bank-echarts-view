import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

type ApiEnvelope<T> = {
  code: number;
  message: string;
  data: T;
};

export const httpClient: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

function unwrapResponse<T>(response: AxiosResponse<ApiEnvelope<T>>) {
  // 统一在这里校验业务码，页面层只接收已经解包的数据。
  const payload = response.data;
  if (payload.code !== 0) {
    throw new Error(payload.message || '业务请求失败');
  }

  return payload.data;
}

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error instanceof Error ? error.message : '网络请求异常';
    return Promise.reject(new Error(message));
  },
);

export const http = {
  get<T>(url: string, params?: Record<string, unknown>) {
    return httpClient
      .get<ApiEnvelope<T>, AxiosResponse<ApiEnvelope<T>>>(url, { params })
      .then(unwrapResponse);
  },
  post<T>(url: string, body?: Record<string, unknown>) {
    return httpClient
      .post<ApiEnvelope<T>, AxiosResponse<ApiEnvelope<T>>>(url, body)
      .then(unwrapResponse);
  },
};
