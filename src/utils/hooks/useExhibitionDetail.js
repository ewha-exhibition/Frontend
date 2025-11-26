import useCustomFetch from "./useCustomFetch";

export default function useExhibitionDetail(exhibitionId) {
  const url = exhibitionId ? `/exhibition/${exhibitionId}` : null;

  const { data, loading, error } = useCustomFetch(url);

  // API 구조:
  // { status, message, data: { exhibitionId, exhibitionName, ... } }
  const detail = data?.data ?? {};

  return { detail, loading, error };
}
