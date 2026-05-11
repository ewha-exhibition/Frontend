import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../apis/axiosInstance";

export default function useLatestExhibitions(category = null, limit = 10) {
  const [exhibitions, setExhibitions] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // category 변경 시 리셋
  useEffect(() => {
    setExhibitions([]);
    setPageNum(0);
    setHasMore(true);
  }, [category]);

  // fetch
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const url =
      category && category.trim().length > 0
        ? `/exhibitions/latest?category=${category}&pageNum=${pageNum}&limit=${limit}`
        : `/exhibitions/latest?pageNum=${pageNum}&limit=${limit}`;

    axiosInstance({ method: "GET", url })
      .then((res) => {
        if (cancelled) return;
        const data = res.data?.data;
        const newItems = data?.exhibitions ?? [];
        const pageInfo = data?.pageInfo ?? {};
        const { pageNum: currentPage, totalPages } = pageInfo;

        setExhibitions((prev) =>
          pageNum === 0 ? newItems : [...prev, ...newItems]
        );
        setHasMore((currentPage ?? 0) < (totalPages ?? 1) - 1);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, pageNum, limit]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPageNum((p) => p + 1);
    }
  }, [loading, hasMore]);

  return { exhibitions, loading, hasMore, loadMore };
}
