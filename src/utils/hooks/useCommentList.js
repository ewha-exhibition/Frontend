import useCustomFetch from "./useCustomFetch";

export default function useCommentList(
  type,
  exhibitionId,
  pageNum = 0,
  limit = 10
) {
  // API 엔드포인트 매핑
  const endpointMap = {
    cheer: "cheers",
    question: "questions",
    review: "reviews",
  };

  const endpoint = endpointMap[type];
  const shouldFetch = endpoint && exhibitionId;

  // 최종 호출 URL
  const url = shouldFetch
    ? `/${endpoint}/${exhibitionId}?pageNum=${pageNum}&limit=${limit}`
    : null;

  const { data, loading, error, fetchData } = useCustomFetch(url, "GET");

  // 실제 API 구조는 data.data.comments
  const responseData = data?.data || {};

  const comments = responseData.comments || [];
  const pageInfo = responseData.pageInfo || {
    pageNum,
    limit,
    totalPages: 0,
    totalElements: 0,
  };

  return {
    comments,
    pageInfo,
    loading: loading || false,
    error,
    refetch: fetchData,
  };
}
