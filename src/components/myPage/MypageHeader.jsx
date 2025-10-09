import styled from "styled-components";

import MenuIcon from "../../assets/icons/Menu.svg?react";

function MypageHeader({ color, authorized, nickname }) {
  return (
    <Container color={color}>
      {authorized ? <Nickname>{nickname} 님</Nickname> : <Logo>綠’ KNOCK</Logo>}
      <MenuIcon width={24} height={24} />
    </Container>
  );
}

export default MypageHeader;

const Container = styled.div`
  width: 100%;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ color }) => color};

  padding: 14px 20px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.headline18};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const Nickname = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.headline18};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
