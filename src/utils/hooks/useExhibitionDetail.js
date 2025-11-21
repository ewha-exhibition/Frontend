import useCustomFetch from "./useCustomFetch";

export default function useExhibitionDetail(exhibitionId) {
  const url = exhibitionId ? `/exhibition/${exhibitionId}` : null;

  const { data, loading, error } = useCustomFetch(url);

  return {
    detail: data?.data ?? {},
    loading,
    error,
  };
}
