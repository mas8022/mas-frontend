const { default: axios } = require("axios");

const serverFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_NAME,
  withCredentials: true,
});

serverFetch.interceptors.request.use();
