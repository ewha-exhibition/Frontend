import useCustomFetch from "./useCustomFetch";

export default function useLatestExhibitions(
  category = null,
  pageNum = 0,
  limit = 10
) {
  // category가 존재할 때만 category 쿼리 추가
  const url =
    category && category.trim().length > 0
      ? `/exhibitions/latest?category=${category}&pageNum=${pageNum}&limit=${limit}`
      : `/exhibitions/latest?pageNum=${pageNum}&limit=${limit}`;

  const { data, loading, error } = useCustomFetch(url);

  return {
    exhibitions: data?.data?.exhibitions ?? [],
    pageInfo: data?.data?.pageInfo ?? {},
    loading,
    error,
  };
}
