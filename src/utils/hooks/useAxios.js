import { axiosInstance } from "../apis/axiosInstance";

// 인터셉터는 axiosInstance.js 모듈 레벨에서 1회 등록됩니다.
// 이 hook은 axiosInstance 참조만 반환합니다.
const useAxios = () => axiosInstance;

export default useAxios;
