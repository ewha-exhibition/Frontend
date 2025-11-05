import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ChevronLeft from "../assets/icons/ChevronLeft.svg?react";
import Link from "../assets/icons/Link.svg?react";

function Topbar({ title, icon }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ChevronLeft height={14} width={24} onClick={goBack} />
      <h3>{title}</h3>

      {icon === "Link" ? (
        <Link height={18} width={24} />
      ) : (
        // 오른쪽 공간 맞추기용 더미
        <Spacer />
      )}
    </Container>
  );
}

export default Topbar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw); /* AppLayout 폭과 맞추기 */
  height: 46px;
  padding: 14px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 110; /* 탭바보다 살짝 위 */
  /* 필요하면 그림자
  box-shadow: 0 1px 0 rgba(0,0,0,0.05);
  */

  h3 {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.headline20};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;

const Spacer = styled.div`
  width: 24px;
  height: 18px;
`;
