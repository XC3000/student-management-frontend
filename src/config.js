import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://myapp-250.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
