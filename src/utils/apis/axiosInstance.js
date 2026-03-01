import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor: 액세스 토큰 헤더 첨부 (앱 시작 시 1회만 등록)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = sessionStorage.getItem("refreshToken"); // 미리 확인

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh")
    ) {
      // 1. 리프레시 토큰이 없으면 재발급 시도 자체를 하지 않음
      if (!refreshToken) {
        // 여기서 바로 에러를 던져서 컴포넌트 레벨에서 처리하게 하거나, 
        // 그냥 리다이렉트 없이 에러만 반환합니다.
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post(
          "/api/auth/refresh",
          { refreshToken },
          { withCredentials: true }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.data;

        sessionStorage.setItem("accessToken", newAccessToken);
        sessionStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 2. 재발급 시도 중 진짜 에러가 났을 때만 로그아웃 처리
        console.error("세션이 만료되었습니다. 다시 로그인해주세요.");
        sessionStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
