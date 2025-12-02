import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axiosInstance";

const useAxios = () => {
  //const navigate = useNavigate();

  const requestInterceptor = useCallback((config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, []);

  useEffect(() => {
    const req = axiosInstance.interceptors.request.use(requestInterceptor);
    const res = axiosInstance.interceptors.response.use(
      (response) => response,
    );

    return () => {
      axiosInstance.interceptors.request.eject(req);
      axiosInstance.interceptors.response.eject(res);
    };
  }, [requestInterceptor]);

  return axiosInstance;
};

export default useAxios;
