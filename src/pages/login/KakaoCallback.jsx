import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { axiosInstance } from "../../utils/apis/axiosInstance";

function KakaoCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const getCode = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
      //console.log(code);

      if (!code) {
        console.error("카카오 인가 코드를 받지 못했습니다.");
        alert("카카오 로그인에 실패했습니다.");
        navigate("/mypage");
        return;
      }

      try {
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/kakao`,
          { code, redirectUri }
        );
        console.log("res:", response);
        const memberId = response?.data.data.memberId;
        sessionStorage.setItem("memberId", memberId);


        const token = await axiosInstance.get(
          `${import.meta.env.VITE_APP_API_URL}/api/auth/test-auth/token/${memberId}`
        );
        //console.log(token);
        const accessToken = token?.data.data.accessToken;
        sessionStorage.setItem("accessToken", accessToken);


        navigate("/");
      } catch (error) {
        console.error("로그인 처리 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/mypage");
      }
    };

    getCode();
  }, [location, navigate]);

  return (
    <>
      <p>로그인 중입니다</p>
    </>
  );
}

export default KakaoCallback;
