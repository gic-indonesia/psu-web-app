import axios from "axios";

const generalInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GIC_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

generalInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
)

export default generalInstance;