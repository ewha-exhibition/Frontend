import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axiosInstance";

const useAxios = () => {
  const navigate = useNavigate();

  const requestInterceptor = useCallback((config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, []);

  const responseInterceptor = useCallback(
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axiosInstance.post(
            "/api/auth/refresh",
            null,
            { withCredentials: true }
          );

          const newAccessToken = refreshResponse.data.accessToken;

          // 새 accessToken 저장
          sessionStorage.setItem("accessToken", newAccessToken);

          // 요청에 새 토큰 사용
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // refresh 실패 → 로그아웃
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");

          navigate("/mypage", { replace: true });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
    [navigate]
  );

  useEffect(() => {
    const req = axiosInstance.interceptors.request.use(requestInterceptor);
    const res = axiosInstance.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );

    return () => {
      axiosInstance.interceptors.request.eject(req);
      axiosInstance.interceptors.response.eject(res);
    };
  }, [requestInterceptor, responseInterceptor]);

  return axiosInstance;
};

export default useAxios;
