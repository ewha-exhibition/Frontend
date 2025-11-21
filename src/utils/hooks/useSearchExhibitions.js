import useCustomFetch from "./useCustomFetch";

export default function useSearchExhibitions(keyword, pageNum = 0, limit = 10) {
  // keyword가 없으면 API 호출을 막기 위해 url을 null로 설정
  const url =
    keyword && keyword.trim().length > 0
      ? `/exhibitions/search?keyword=${keyword}&pageNum=${pageNum}&limit=${limit}`
      : null;

  const { data, error, loading } = useCustomFetch(url);

  return {
    exhibitions: data?.exhibitions ?? [],
    pageInfo: data?.pageInfo ?? {},
    loading,
    error,
  };
}
