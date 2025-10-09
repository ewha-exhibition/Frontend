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
      {icon === "Link" && <Link height={18} width={24} />}

      {icon === "none" && <div style={{ height: 18, width: 24 }} />}
    </Container>
  );
}

export default Topbar;

const Container = styled.div`
  width: 100%;
  height: 46px;
  padding: 14px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.colors.gray10};
    font-size: ${({ theme }) => theme.font.fontSize.headline20};
    font-weight: ${({ theme }) => theme.font.lineHeight.bold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
