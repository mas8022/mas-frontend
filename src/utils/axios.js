import axios from "axios";

const Fetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_NAME}`,
  withCredentials: true,
});

Fetch.interceptors.response.use((res) => res.data);

export default Fetch;
