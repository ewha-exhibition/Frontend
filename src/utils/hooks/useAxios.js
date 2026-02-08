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

      // 401(Unauthorized) 또는 403(Forbidden) 에러 발생 시 재발급 로직 진입
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/api/auth/refresh")
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = sessionStorage.getItem("refreshToken");

          // 리프레시 토큰이 없다면 로그아웃 처리
          if (!refreshToken) throw new Error("No refresh token available");

          // 1. 토큰 재발급 요청 (요청하신 데이터 구조 반영)
          const response = await axiosInstance.post(
            "/api/auth/refresh",
            { refreshToken },
            { withCredentials: true },
          );

          // 2. 응답 데이터 구조
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.data;

          // 3. sessionStorage 업데이트
          sessionStorage.setItem("accessToken", newAccessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          // 4. 실패했던 이전 요청의 헤더를 새 토큰으로 교체 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // 재발급 실패 시 (리프레시 토큰 만료 등) 세션 클리어 후 로그인 페이지로 유도
          console.error("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.clear();
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
