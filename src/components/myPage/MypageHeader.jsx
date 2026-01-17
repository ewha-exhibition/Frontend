import styled from "styled-components";
import MenuTrigger from "../menu/MenuTrigger";
import NewLogo from "../../assets/icons/Logo.svg";

function MypageHeader({ color, authorized, nickname }) {
  return (
    <Container color={color}>
      {authorized ? <Nickname>{nickname}</Nickname> : <Logo src={NewLogo} />}
      <MenuTrigger />
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

const Logo = styled.img`
  width: 80px;
`;

const Nickname = styled.div`
  font-family: "GMarketSans", "SUIT-Variable", sans-serif;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.SubColor1};
  font-size: ${({ theme }) => theme.font.fontSize.headline18};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
