import useCustomFetch from "./useCustomFetch";

export default function useSearchExhibitions(keyword, pageNum = 0, limit = 10) {
  const encodedKeyword = keyword && encodeURIComponent(keyword.trim());

  const url = encodedKeyword
    ? `/exhibitions/search?keyword=${encodedKeyword}&pageNum=${pageNum}&limit=${limit}`
    : null;

  const { data, error, loading } = useCustomFetch(url);

  return {
    exhibitions: data?.data?.exhibitions ?? [],
    pageInfo: data?.data?.pageInfo ?? {},
    loading,
    error,
  };
}
