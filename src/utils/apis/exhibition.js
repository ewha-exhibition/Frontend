import { axiosInstance } from "./axiosInstance";

export const getExhibitionApi = async (id) => {
  try {
    const response = await axiosInstance.get(`/exhibition/${id}`);
    return response.data;
  } catch (error) {
    console.error("[TEST]전시 정보 조회 실패, 원인:", error);
    throw error;
  }
};
