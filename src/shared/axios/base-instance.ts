'use client'
import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

baseInstance.interceptors.request.use(
  async (config) => {
    const { data } = await axios.get('/api/get-token');
    if (data && data.token) {
      config.headers['Authorization'] = `Bearer ${data.token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  },
)

baseInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        if (response.status === 401) {
          toast.error(`Unauthorized: ${response.data.message}`)
        } else if (response.status === 403) {
          toast.error(`Forbidden: ${response.data.message}`);
        } else if (response.status === 500) {
          toast.error(`Error: ${response.data.message}`);
        }
      } else {
        toast.error(`Network Error: ${error.message}`);
      }
    }
    return Promise.reject(error);
  },
)

export default baseInstance;