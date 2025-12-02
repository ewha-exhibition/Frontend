import { useState } from "react";
import useAxios from "./useAxios";

export default function usePostRequest() {
  const axiosClient = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, body = {}, token = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient({
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: body,
      });

      return response.data;
    } catch (err) {
      setError(err);
      console.error("POST 요청 오류:", err);
      if (err.response) {
        console.log("🔴 서버 status:", err.response.status);
        console.log("🔴 서버 응답 데이터:", err.response.data);
      } else {
        console.log("🔴 response 없이 실패:", err.message);
      }
      return err.response?.data ?? { success: false, reason: "서버 오류" };
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
}
