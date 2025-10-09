import styled, { useTheme } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MypageHeader from "../../components/myPage/MypageHeader";
import Banner from "../../components/myPage/Banner";

import Kakao from "../../assets/icons/Kakao.png";
import ChevronRight from "../../assets/icons/ChevronRight.svg?react";

function MyPage() {
  const theme = useTheme();
  const [login, setLogin] = useState(false);
  //disabled 하는 기능 필요

  const navigate = useNavigate();

  //라우팅 설정하고 경로 수정
  const firstTabs = [
    { name: "관람 내역", path: "watched" },
    { name: "작성한 후기", path: "myReviews" },
    { name: "작성한 질문", path: "questions" },
    { name: "작성한 기대평", path: "expectations" },
  ];
  const secondTabs = [
    { name: "공연/전시 등록하기", path: "upload" },
    { name: "행사 초대코드 입력하기", path: "enterCode" },
    { name: "내 공연/전시", path: "myShows" },
  ];

  return (
    <Container>
      <MypageHeader color={theme.colors.Primary50} authorized={login} />
      <Banner />
      <Content>
        {login ? (
          <></>
        ) : (
          <Login>
            <p>로그인하고 기능을 사용해보세요!</p>
            <KakaoBtn
              onClick={() => {
                setLogin(true);
              }}
            >
              <img src={Kakao} alt="카카오 로그인" />
              <span>카카오톡으로 5초 로그인</span>
            </KakaoBtn>
          </Login>
        )}

        <ListArea $login={login}>
          <TabList>
            {firstTabs.map((tab) => (
              <div key={tab.path}>
                <TabItem
                  key={tab.path}
                  onClick={() => navigate(`/mypage/${tab.path}`)}
                >
                  {tab.name}
                  <ChevronRight height={24} width={24} />
                </TabItem>
                {login && tab.path === "watched" && (
                  <History>
                    <p className="notice">아직 관람 내역이 없어요.</p>
                    <p className="notice">
                      관람한 행사가 있다면 후기를 작성하거나 스크랩 목록에서
                      “관람했어요” 버튼을 눌러주세요.
                    </p>
                  </History>
                )}
              </div>
            ))}
          </TabList>
          <Br />
          <SubTitle>벗들에게 공연/전시 홍보하기</SubTitle>
          <TabList>
            {secondTabs.map((tab) => (
              <TabItem
                key={tab.path}
                onClick={() => navigate(`/mypage/${tab.path}`)}
              >
                {tab.name}
                <ChevronRight height={24} width={24} />
              </TabItem>
            ))}
          </TabList>
        </ListArea>
      </Content>
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray1};
`;
const Content = styled.div`
  padding: 0px 20px 0px 20px;
`;
const Login = styled.div`
  display: flex;
  gap: 10px;
  padding: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray8};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const KakaoBtn = styled.div`
  width: 100%;
  height: 49px;
  border-radius: 5px;
  background-color: #fee500;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }

  color: ${({ theme }) => theme.colors.blackMain};
  font-size: ${({ theme }) => theme.font.fontSize.title15};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const ListArea = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ $login }) => ($login ? 1 : 0.35)};
`;

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 20px 0;
`;
const TabItem = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.gray9};
  font-size: ${({ theme }) => theme.font.fontSize.title15};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;
const Br = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  margin: 24px 0;
`;
const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.Primary60};
  font-size: ${({ theme }) => theme.font.fontSize.label16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;

const History = styled.div`
  width: 100%;
  height: 150px;
  margin: 6px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .notice {
    margin: 0 auto;
    margin-bottom: 8px;

    color: ${({ theme }) => theme.colors.gray6};
    font-size: ${({ theme }) => theme.font.fontSize.label14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
    text-align: center;
    max-width: 270px;
  }
`;
