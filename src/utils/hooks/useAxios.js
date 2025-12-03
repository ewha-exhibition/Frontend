import { useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";

const useAxios = () => {
  useEffect(() => {
    const req = axiosInstance.interceptors.request.use(
      (config) => {
        // 쿠키 기반 인증 → Authorization 헤더 불필요
        return config;
      },
      (error) => Promise.reject(error)
    );

    const res = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // 필요 시 error 처리
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(req);
      axiosInstance.interceptors.response.eject(res);
    };
  }, []);

  return axiosInstance;
};

export default useAxios;
