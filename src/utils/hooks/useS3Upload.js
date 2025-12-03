import axios from "axios";

export default function useS3Upload() {
  const uploadToS3 = async (file) => {
    try {
      const extension = file.name.split(".").pop();
      const contentType = file.type;

      // accessToken 가져오기
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access Token이 없습니다.");

      // presigned URL 요청
      const presignedRes = await axios.post(
        "https://api.greenknock.xyz/api/files/presigned",
        {
          fileName: `poster_${Date.now()}.${extension}`,
          contentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { uploadUrl, fileUrl } = presignedRes.data.data;

      // 파일 업로드
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": contentType },
      });

      // URL 반환
      return fileUrl;
    } catch (err) {
      console.error("S3 업로드 실패:", err);
      return null;
    }
  };

  return { uploadToS3 };
}
