import styled from "styled-components";
import { useState } from "react";

import Hamburger from "../../assets/icons/HamburgerMenu.svg?react";

import Review from "./Review";
import Cheering from "./Cheering";

function GuestBook() {
  const [now, setNow] = useState("review");

  return (
    <Container>
      <Header>
        <Title>방명록</Title>
        <Hamburger height={24} width={24} />
      </Header>

      <Tab>
        <TabItem
          className={now === "review" ? "active" : ""}
          onClick={() => setNow("review")}
        >
          후기
        </TabItem>
        <TabItem
          className={now === "cheering" ? "active" : ""}
          onClick={() => setNow("cheering")}
        >
          응원
        </TabItem>
      </Tab>
      <Content>
        {now === "review" && <Review />}
        {now === "cheering" && <Cheering />}
      </Content>
    </Container>
  );
}

export default GuestBook;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 47px;
  padding: 0px 20px 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 6px;
`;
const Title = styled.h3`
  color: ${({ theme }) => theme.colors.gray10};
  font-size: ${({ theme }) => theme.font.fontSize.headline20};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;
const Tab = styled.div`
    width = 100%;
    height: 35px;
    padding: 0px 20px 0px 20px;

    display: flex;
    gap: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;
const TabItem = styled.div`
  padding: 0 10px 0 10px;

  color: ${({ theme }) => theme.colors.gray6};
  font-size: ${({ theme }) => theme.font.fontSize.title15};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};

  &.active {
    color: ${({ theme }) => theme.colors.gray10};
    border-bottom: 1.5px solid black;
  }
`;
const Content = styled.div`
  width: 100%;
`;
