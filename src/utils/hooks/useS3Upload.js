import axios from "axios";

export default function useS3Upload() {
  const uploadToS3 = async (file) => {
    try {
      const extension = file.name.split(".").pop();
      const contentType = file.type;

      // presigned URL 요청
      const presignedRes = await axios.post(
        "https://api.greenknock.xyz/api/files/presigned",
        {
          fileName: `poster_${Date.now()}.${extension}`,
          contentType,
        }
      );

      const { uploadUrl, fileUrl } = presignedRes.data.data;

      // presigned URL에 PUT 업로드
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": contentType },
      });

      // 최종 fileUrl 반환
      return fileUrl;
    } catch (err) {
      console.error("S3 업로드 실패:", err);
      return null;
    }
  };

  return { uploadToS3 };
}
