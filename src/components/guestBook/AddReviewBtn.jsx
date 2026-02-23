import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useLogin from "../../utils/hooks/useLogin";

import Plus from "../../assets/icons/Plus.svg?react";

function AddReviewBtn() {
  const login = useLogin();
  const navigate = useNavigate();

  const handleFabClick = () => {
    if (login) {
      navigate("/mypage/watched");
    } else {
      navigate("/mypage");
    }
  };
  return (
    <FloatingButton onClick={handleFabClick}>
      <Plus width={13} height={13} />
      <p>후기 작성하기</p>
    </FloatingButton>
  );
}

export default AddReviewBtn;

const FloatingButton = styled.button`
  position: fixed;
  z-index: 1000;

  width: 125px;
  height: 48px;
  border-radius: 100px;
  padding: 8px 12px;
  border: none;

  background-color: ${({ theme }) => theme.colors.Primary50};
  box-shadow: 1px 2px 5px 0 rgba(0, 0, 0, 0.1);

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.label14};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};

  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  bottom: 70px;
  left: 50%;
  transform: translateX(calc(270px - 100% - 20px));

  @media (max-width: 540px) {
    left: auto;
    right: 20px;
    transform: none;
  }
`;
