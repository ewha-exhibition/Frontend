import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axiosInstance";

const useAxios = () => {
  const navigate = useNavigate();

  const requestInterceptor = useCallback((config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken && !config.url.includes("/api/auth/refresh")) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, []);

  const responseInterceptor = useCallback(
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/api/auth/refresh")
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = sessionStorage.getItem("refreshToken");
          const refreshResponse = await axiosInstance.post(
            "/api/auth/refresh",
            { refreshToken },
            { withCredentials: true },
          );

          const newAccessToken = refreshResponse.data.accessToken;

          // 새 accessToken 저장
          sessionStorage.setItem("accessToken", newAccessToken);

          // 요청에 새 토큰 사용
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.clear(); // 안전하게 전체 삭제
          navigate("/mypage", { replace: true });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
    [navigate],
  );

  useEffect(() => {
    const req = axiosInstance.interceptors.request.use(requestInterceptor);
    const res = axiosInstance.interceptors.response.use(
      (response) => response,
      responseInterceptor,
    );

    return () => {
      axiosInstance.interceptors.request.eject(req);
      axiosInstance.interceptors.response.eject(res);
    };
  }, [requestInterceptor, responseInterceptor]);

  return axiosInstance;
};

export default useAxios;
