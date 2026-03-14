import { useState, useEffect } from "react";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem("accessToken") ||
      !!localStorage.getItem("refreshToken"),
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(
        !!localStorage.getItem("accessToken") ||
          !!localStorage.getItem("refreshToken"),
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return isLogin;
};

export default useLogin;
