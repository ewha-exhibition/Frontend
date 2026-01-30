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

export const deleteExhibitionApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/exhibition/${id}`);
    return response.data;
  } catch (error) {
    console.error("[TEST]전시 삭제 실패, 원인:", error);
    throw error;
  }
};

export const updateExhibitionApi = async (id, body) => {
  try {
    const response = await axiosInstance.patch(`/exhibition/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("[TEST] 전시 수정 실패, 원인:", error);
    throw error;
  }
};
