import styled from "styled-components";

import Edit from "../../assets/icons/Edit.svg?react";
import Link from "../../assets/icons/Link.svg?react";

function ShowBtn({ name, icon, onClick }) {
  return (
    <Container onClick={onClick}>
      <p>{name}</p>
      {icon === "Edit" && <Edit width={16} height={16} />}
      {icon === "Link" && <Link width={16} height={16} />}
    </Container>
  );
}

export default ShowBtn;

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 50%;
  height: 34px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.gray1};
  p {
    color: ${({ theme }) => theme.colors.gray8};
    font-size: ${({ theme }) => theme.font.fontSize.label14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
  path {
    stroke: ${({ theme }) => theme.colors.gray8};
  }
`;
