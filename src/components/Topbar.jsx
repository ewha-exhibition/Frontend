import styled from "styled-components";

import ChevronLeft from "../assets/icons/ChevronLeft.svg?react";
import Link from "../assets/icons/Link.svg?react";

function Topbar({ title, icon }) {
  return (
    <Container>
      <ChevronLeft height={14} width={24} />
      <h3>{title}</h3>
      {icon === "Link" && <Link height={18} width={24} />}
    </Container>
  );
}

export default Topbar;

//상단 고정
const Container = styled.div`
  width: 100%;
  height: 46px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  h3 {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.headline20};
    font-weight: ${({ theme }) => theme.font.lineHeight.bold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
