import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogin from "../../utils/hooks/useLogin";
import MenuTrigger from "../../components/menu/MenuTrigger";
import TabBar from "../../components/home/TabBar";
import Review from "./Review";
import Cheering from "./Cheering";

import Plus from "../../assets/icons/Plus.svg?react";

function GuestBook() {
  const login = useLogin();
  const navigate = useNavigate();

  const [now, setNow] = useState("review");

  const handleFabClick = () => {
    if (login) {
      navigate("/mypage/watched");
    } else {
      navigate("/mypage");
    }
  };

  return (
    <Container>
      <Header>
        <Title>방명록</Title>
        <MenuTrigger variant="black" />
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
      <FloatingButton onClick={handleFabClick}>
        <Plus width={13} height={13} />
        <p>후기 작성하기</p>
      </FloatingButton>
      <TabBar />
    </Container>
  );
}

export default GuestBook;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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
const FloatingButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 70px;
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
`;
