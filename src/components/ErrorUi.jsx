import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "../assets/icons/Refresh.svg?react";
import Nothing from "./Nothing";
export default function ErrorUi({ message }) {
  const navigate = useNavigate();
  return (
    <>
      <Nothing
        text={
          message ||
          "서비스에 일시적인 문제가 발생했어요.\n다시 한번 시도해주세요"
        }
      />
      <BottomBar>
        <RefreshBtn type="button" onClick={() => window.location.reload()}>
          <RefreshIcon />
        </RefreshBtn>
        <HomeBtn type="button" onClick={() => navigate("/")}>
          홈으로 이동하기
        </HomeBtn>
      </BottomBar>
    </>
  );
}

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  padding: 0 20px 40px;
  display: flex;
  gap: 8px;
`;

const RefreshBtn = styled.button`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.gray7};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeBtn = styled.button`
  flex: 1;
  height: 50px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.Primary50};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.textStyles.label0SemiBold};
  display: flex;
  align-items: center;
  justify-content: center;
`;
