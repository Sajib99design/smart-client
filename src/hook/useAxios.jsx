import axios from "axios";

// একবার instance তৈরি করো
const axiosInstance = axios.create({
  baseURL: "https://smart-deal-eta.vercel.app",
});

// এখন custom hook বানাও
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
