import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ChevronLeft from "../../assets/icons/ChevronLeft.svg?react";
import Menu from "../../assets/icons/Menu.svg?react";

function HostTopBar({ title, onClick }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ChevronLeft height={14} width={24} onClick={goBack} />
      <h3>{title}</h3>
      <Menu height={18} width={24} color="white" onClick={onClick} />
    </Container>
  );
}

export default HostTopBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  height: 46px;
  padding: 14px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;

  h3 {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.headline20};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
