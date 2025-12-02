import useDeleteRequest from "./useDeleteRequest";

export default function useDeleteComment() {
  const { remove, loading, error } = useDeleteRequest();

  // 엔드포인트 매핑
  const endpointMap = {
    question: "questions",
    comment: "comments",
    cheer: "cheers",
  };

  /**
   * @param {Object} params
   * @param {"question"|"comment"|"cheer"} params.type
   * @param {number|string} params.id  - 삭제할 대상 ID
   * @param {string|null} params.token - 인증 토큰
   */
  const deleteContent = async ({ type, id, token }) => {
    const endpoint = endpointMap[type];
    if (!endpoint) {
      console.error("잘못된 타입:", type);
      return { status: 400, message: "잘못된 삭제 타입입니다." };
    }

    const url = `/${endpoint}/${id}`;

    return await remove(url, token);
  };

  return { deleteContent, loading, error };
}
