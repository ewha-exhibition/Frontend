import { axiosInstance } from "./axiosInstance";

// 댓글 목록 조회 API
export const getCommentsApi = async ({ exhibitionId, type, page, limit }) => {
  try {
    const response = await axiosInstance.get(
      `/${type}s/${exhibitionId}?pageNum=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw error;
  }
};

// 댓글 작성 API (질문, 응원, 답글(==comment))
// 예외: 답글의 경우, exhibitionId는 답글을 단 댓글의 postID
export const createCommentApi = async ({ exhibitionId, type, content }) => {
  try {
    const response = await axiosInstance.post(`/${type}s/${exhibitionId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

// 댓글 삭제 API (질문, 응원, 답글)
// 예외: 답글의 경우, postId는 답글의 commentId

export const deleteCommentApi = async ({ postId, type }) => {
  try {
    const response = await axiosInstance.delete(`/${type}s/${postId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw error;
  }
};
