import styled from "styled-components";

import Kakao from "../../assets/icons/Kakao.png";

function KakaoBtn() {
  const client_id = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Btn onClick={handleKakaoLogin}>
      <img src={Kakao} alt="카카오 로그인" />
      <span>카카오톡으로 5초 로그인</span>
    </Btn>
  );
}

export default KakaoBtn;

const Btn = styled.div`
  width: 100%;
  height: 49px;
  border-radius: 5px;
  background-color: #fee500;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }

  color: ${({ theme }) => theme.colors.blackMain};
  font-size: ${({ theme }) => theme.font.fontSize.title15};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
