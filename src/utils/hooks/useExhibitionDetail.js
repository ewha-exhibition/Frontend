import useCustomFetch from "./useCustomFetch";

export default function useExhibitionDetail(exhibitionId) {
  const url = exhibitionId ? `/exhibition/${exhibitionId}` : null;
try {
    // 실제 백엔드 API 주소에 맞춰 '/exhibitions' 혹은 '/exhibition'으로 수정하세요.
    const response = await client.get(`/exhibitions/${id}`);
    
    // axios는 서버 응답을 response.data에 담아서 줍니다.
    // 백엔드가 준 JSON 전체({ status: 200, data: {...} })를 반환합니다.
    return response.data; 
  } catch (error) {
    // 에러를 콘솔에 찍고, 호출한 곳(Detail.js)으로 에러를 던집니다.
    console.error("전시 정보 조회 실패:", error);
    throw error;
  }
};