import { useState, useEffect } from "react";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(
    !!sessionStorage.getItem("accessToken") ||
      !!sessionStorage.getItem("refreshToken"),
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogin(
        !!sessionStorage.getItem("accessToken") ||
          !!sessionStorage.getItem("refreshToken"),
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return isLogin;
};

export default useLogin;
