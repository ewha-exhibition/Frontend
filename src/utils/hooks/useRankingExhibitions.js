import useCustomFetch from "./useCustomFetch";

const useRankingExhibitions = () => {
  const { data, error, loading } = useCustomFetch("/exhibitions/ranking");

  return {
    list: data?.data || [],
    loading,
    error,
  };
};

export default useRankingExhibitions;
