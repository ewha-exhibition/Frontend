import useCustomFetch from "./useCustomFetch";

const usePostExhibition = () => {
  const { fetchData } = useCustomFetch();

  const createExhibition = async (payload) => {
    try {
      // API 명세에 따른 POST 요청
      const response = await fetchData("/exhibition", "POST", payload);

      if (response && response.status === 200) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error("전시 등록 에러:", error);
      return { success: false };
    }
  };

  return { createExhibition };
};

export default usePostExhibition;
