// src/utils/hooks/useS3Upload.js
import { uploadImageToS3 } from "../apis/uploadImageToS3";
import useCustomFetch from "./useCustomFetch";

const useS3Upload = () => {
  const { fetchData } = useCustomFetch();

  const uploadToS3 = async (file, url) => {
    if (!file) return null;

    try {
      // Presigned URL 발급
      const res = await fetchData(url, "GET");
      const presignedUrl = res?.data?.data?.url;

      if (!presignedUrl) {
        console.error("Presigned URL 발급 실패", res);
        return null;
      }

      //s3 업로드
      await uploadImageToS3(file, presignedUrl);

      // URL 정제
      return presignedUrl.split("?")[0];
    } catch (error) {
      console.error("S3 업로드 중 에러 발생:", error);
      return null;
    }
  };

  return { uploadToS3 };
};

export default useS3Upload;
