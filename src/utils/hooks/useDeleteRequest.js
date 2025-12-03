// src/utils/hooks/useDeleteRequest.js
import { useState } from "react";
import useAxios from "./useAxios";

export default function useDeleteRequest() {
  const axiosClient = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (url, token = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient({
        method: "DELETE",
        url,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return response.data; // 서버 응답 (status, message)
    } catch (err) {
      console.error("DELETE 요청 오류:", err);
      setError(err);
      return err.response?.data ?? { status: 500, message: "서버 오류" };
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
