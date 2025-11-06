import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// একবার instance তৈরি করো
const axiosInstanceSecure = axios.create({
    baseURL: "https://smart-deal-eta.vercel.app",
});



// এখন custom hook বানাও
const useAxiosSecure = () => {
    const { user, signOutGoogle } = useAuth();
    const navigate = useNavigate();
    //set token the header for all the api call using axiousSeure hook
    useEffect(() => {

        // request interceptor
        // Axios এর মাধ‌্যমে সাভারে  headers.Authorization পাঠানো হচ্ছে
        const requestInterceptor = axiosInstanceSecure.interceptors.request.use((config) => {
            console.log(config);
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config;
        });

        // response interceptor
        // টুকেন থাকবে না তখন এই  Axios বল্ক কাজ করবে।
        const responseInterceptor = axiosInstanceSecure.interceptors.response.use(res => {
            return res;
        }, err => {
            // console.log(err);
            const status = err.status;
            if (status === 401 || status === 403) {
                signOutGoogle();
                navigate('/register');
            }

        })

        // unmound থেকে বের করে দিলাম
        return () => {
            axiosInstanceSecure.interceptors.request.eject(requestInterceptor)
            axiosInstanceSecure.interceptors.request.eject(responseInterceptor)
        }


    }, [user, signOutGoogle, navigate])


    return axiosInstanceSecure;

};

export default useAxiosSecure;



// useEffect(
//     () => {
//         const interceptor = axiosInstanceSecure.interceptors.request.use((config) => {
//             console.log(config);
//             config.headers.Authorization = `Bearer ${user.accessToken}`
//             return config;
//         })
//         return () => {
//             axiosInstanceSecure.interceptors.request.eject(interceptor)
//         }
//     }
//     , [user])