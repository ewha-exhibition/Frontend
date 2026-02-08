import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Nothing from "./Nothing";

export default function ErrorUi({ message }) {
  const navigate = useNavigate();
  return (
    <Area>
      <Nothing
        text={
          message ||
          "서비스에 일시적인 문제가 발생했어요.\n다시 한번 시도해주세요"
        }
      />
      <Button onClick={navigate("/")}>홈으로 이동하기</Button>
    </Area>
  );
}

const Area = styled.div`
  min-height: calc(100vh - 120px);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
  text-align: center;

  p {
    color: ${({ theme }) => theme.colors.gray5};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
  }
`;
const Button = styled.button`
  display: flex;
  width: 100%;
  max-width: 380px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  ${({ theme }) => theme.textStyles.label0SemiBold};
  background-color: ${({ theme }) => theme.colors.Primary50};

  color: ${({ theme }) => theme.colors.white};
`;
