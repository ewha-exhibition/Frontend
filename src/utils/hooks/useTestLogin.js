import { useEffect, useState } from "react";
import axios from "axios";

export default function useTestLogin(memberId = 1) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  1;
  const TEST_TOKEN_URL = `https://api.greenknock.xyz/api/auth/test-auth/token/${memberId}`;

  const fetchTestToken = async () => {
    try {
      setLoading(true);
      const res = await axios.get(TEST_TOKEN_URL, {
        withCredentials: false,
      });

      const accessToken = res.data?.data?.accessToken;
      if (!accessToken) throw new Error("Access token not found");

      // localStorage에 저장
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
      setError(null);
    } catch (err) {
      console.error("자동 로그인 실패:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 이미 토큰이 있으면 재요청 안 함
    const existing = localStorage.getItem("accessToken");
    if (existing) {
      setToken(existing);
      setLoading(false);
      return;
    }

    fetchTestToken();
  }, [memberId]);

  return { token, loading, error, refetch: fetchTestToken };
}
