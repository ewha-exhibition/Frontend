import styled, { useTheme } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MypageHeader from "../../components/myPage/MypageHeader";
import Banner from "../../components/myPage/Banner";
import TabBar from "../../components/home/TabBar";
import KakaoBtn from "../../components/myPage/KakaoBtn";

import Kakao from "../../assets/icons/Kakao.png";
import ChevronRight from "../../assets/icons/ChevronRight.svg?react";

import poster1 from "../../assets/mock/poster1.jpg";
import poster2 from "../../assets/mock/poster2.jpg";
import poster3 from "../../assets/mock/poster3.jpg";
import poster4 from "../../assets/mock/poster4.jpg";

function MyPage() {
  const mock_data = {
    response: 200,
    result: [
      {
        id: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회 어쩌고저쩌고 텍스트",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster1,
        haveReview: false,
        onGoing: true,
      },
      {
        id: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.09.10-09.11",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster2,
        haveReview: true,
        onGoing: false,
      },
      {
        id: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        haveReview: true,
        onGoing: true,
      },
      {
        id: 4,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster4,
        haveReview: false,
        onGoing: false,
      },
      {
        id: 5,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster4,
        haveReview: false,
        onGoing: false,
      },
    ],
  };

  const theme = useTheme();
  const [login, setLogin] = useState(!!sessionStorage.getItem("accessToken"));
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
            <KakaoBtn />
          </Login>
        )}

        <ListArea $login={login}>
          <TabList>
            {firstTabs.map((tab) => (
              <div key={tab.path}>
                <TabItem onClick={() => navigate(`/mypage/${tab.path}`)}>
                  {tab.name}
                  <StyledChevron />
                </TabItem>

                {login && tab.path === "watched" && (
                  <>
                    {mock_data.response === 200 ? (
                      <ShowListArea>
                        {mock_data?.result?.map((data) => (
                          <ShowList key={data.id}>
                            <img src={data.poster} alt="포스터 이미지" />
                            <p>{data.title}</p>
                          </ShowList>
                        ))}
                      </ShowListArea>
                    ) : (
                      <History>
                        <p className="notice">아직 관람 내역이 없어요.</p>
                        <p className="notice">
                          관람한 행사가 있다면 후기를 작성하거나 스크랩 목록에서
                          “관람했어요” 버튼을 눌러주세요.
                        </p>
                      </History>
                    )}
                  </>
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
                <StyledChevron />
              </TabItem>
            ))}
          </TabList>
        </ListArea>
      </Content>
      <TabBar />
    </Container>
  );
}

export default MyPage;

const StyledChevron = styled(ChevronRight)`
  height: 16px;
  width: 10px;
  color: ${({ theme }) => theme.colors.gray6};
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray1};
`;
const Content = styled.div`
  //padding: 0px 20px 0px 20px;
`;
const Login = styled.div`
  display: flex;
  gap: 10px;
  padding: 64px 20px 64px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray8};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;

const ListArea = styled.div`
  pointer-events: ${({ $login }) => ($login ? "auto" : "none")};
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
  padding: 0px 20px 0px 20px;
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
  padding: 0px 20px 0px 20px;

  color: ${({ theme }) => theme.colors.Primary60};
  font-size: ${({ theme }) => theme.font.fontSize.label16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`;

const History = styled.div`
  width: 100%;
  height: 151px;
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
const ShowListArea = styled.div`
  padding: 12px 0 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
`;
const ShowList = styled.div`
  max-width: 93px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  img {
    height: 130px;
    aspect-ratio: 46/65;
    border-radius: 3px;
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    color: ${({ theme }) => theme.colors.gray9};
    font-size: ${({ theme }) => theme.font.fontSize.label12};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
  }
`;
