import styled from "styled-components";
import theme from "../style/Theme.jsx";
import EventList from "../components/home/EventList.jsx";
import TabBar from "../components/home/TabBar.jsx";
import MenuIcon from "../assets/icons/Menu.svg?react";
import SearchIcon from "../assets/icons/Search.svg?react";
import BookmarkIcon from "../assets/icons/Bookmark_nw.svg?react";
import poster1 from "../assets/mock/poster1.jpg";
import poster2 from "../assets/mock/poster2.jpg";
import poster3 from "../assets/mock/poster3.jpg";

function TopTenItem({ rank, title, poster }) {
  return (
    <Card>
      <Poster poster={poster}>
        <Overlay />
        <Bar>
          <Rank>{rank}</Rank>
          <BookmarkIcon width={16} height={19} />
        </Bar>
      </Poster>
      <Title>{title}</Title>
    </Card>
  );
}

//TODO: Event의 공연, 전시, 기타 속성 추가
//TODO: 클릭 시 선택된 카테고리 스타일 변경 (isSelected 추가)

export default function Home() {
  const mock_data_top10 = {
    response: 200,
    result: [
      {
        id: 1,
        rank: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster1,
      },
      {
        id: 2,
        rank: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster2,
      },
      {
        id: 3,
        rank: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster3,
      },
      {
        id: 4,
        rank: 4,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster1,
      },
      {
        id: 5,
        rank: 5,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster2,
      },
      {
        id: 6,
        rank: 6,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster3,
      },
      {
        id: 7,
        rank: 7,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster1,
      },
      {
        id: 8,
        rank: 8,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster2,
      },
      {
        id: 9,
        rank: 9,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster3,
      },
      {
        id: 10,
        rank: 10,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        poster: poster1,
      },
    ],
  };
  const mock_data_event = {
    response: 200,
    result: [
      {
        id: 1,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster1,
        scraped: true,
        onGoing: true,
      },
      {
        id: 2,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.09.10-09.11",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster2,
        scraped: true,
        onGoing: false,
      },
      {
        id: 3,
        title: "Pile up strands - 섬유예술 전공 과제전시회",
        date: "2025.11.20-12.01",
        place: "이화여대 조형예술관 A동  2,4층",
        poster: poster3,
        scraped: true,
        onGoing: true,
      },
    ],
  };
  return (
    <Container>
      <Header>
        <Logo>綠’ KNOCK</Logo>
        <MenuIcon width={24} height={24} />
      </Header>
      <SearchBar>
        <p>이화인들의 공연, 전시를 검색해보세요!</p>
        <SearchIcon width={24} height={24} />
      </SearchBar>

      <Content>
        <WhiteBox />
        <TopTenHeadline>
          <p>오늘의 TOP 10</p>
        </TopTenHeadline>
        <TopTenList>
          {mock_data_top10?.result.map((data) => (
            <TopTenItem
              key={data.id}
              title={data.title}
              rank={data.rank}
              poster={data.poster}
            />
          ))}
        </TopTenList>
        <EventWrapper>
          <CategoryWrapper>
            <CategoryButton>
              <p>전체</p>
            </CategoryButton>
            <CategoryButton>
              <p>공연</p>
            </CategoryButton>
            <CategoryButton>
              <p>전시</p>
            </CategoryButton>
            <CategoryButton>
              <p>기타</p>
            </CategoryButton>
          </CategoryWrapper>
          <EventListWrapper>
            {mock_data_event?.result.map((data) => (
              <EventList
                key={data.id}
                title={data.title}
                date={data.date}
                place={data.place}
                poster={data.poster}
                onGoing={data.onGoing}
              />
            ))}
          </EventListWrapper>
        </EventWrapper>
      </Content>
      <TabBar />
    </Container>
  );
}

//NOTE: Header, Search, Content(Top10, EventList)
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr; //Nav, Search, ContentBody(Top10, EventList)
  background: #00664f; //디자인 시스템에 정의되지 않음
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  margin: 0 auto;
  padding: 14px 20px;
`;

//letter-spacing: 0.165 to 0.17
const Logo = styled.div`
  color: ${theme.colors.white};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.17px;
`;

//padding: 18.812 to 19
//gap: 92.19 to 92
const SearchBar = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 92px;
  margin: 9px 21px 24px 20px;
  padding: 8px 18px 8px 19px;
  border-radius: 20px;
  border: 1.5px solid #74a08f;
  p {
    ${theme.textStyles.label2Regular}
    color: ${theme.colors.Primary10};
  }
`;
//NOTE: Content - Top10, EventList
const Content = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;
const TopTenHeadline = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 21px 12px;
  p {
    ${theme.textStyles.titleSemiBold}
    color: ${theme.colors.white};
  }
`;
const TopTenList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 8px;
  overflow-x: auto;
`;

//width: 107.078 to 107
//gap: 7.812 to 7.8
const Card = styled.div`
  flex: 1 1 calc(100% / 3);
  max-width: 200px;
  min-width: 107px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7.8px;
`;
const Poster = styled.div`
  aspect-ratio: 107 / 151.42;
  border-radius: 3px;
  background-color: ${theme.colors.gray10};
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.23) 12.85%,
    rgba(0, 0, 0, 0) 43.65%
  );
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 11px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1;
`;

// 순위
const Rank = styled.span`
  color: ${theme.colors.white};
  text-shadow: 0 0 10px #000;
  font-family: SUIT;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
`;

//REVIEW: Title - 39px height
const Title = styled.p`
  width: 100%;
  height: 39px;
  ${theme.textStyles.titleSemiBold};
  color: ${theme.colors.gray10};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const WhiteBox = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex: 1;
  z-index: 0;
`;
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
`;
const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  margin-bottom: 8px;
  z-index: 1;
`;
const CategoryButton = styled.div`
  display: flex;
  width: 78px;
  padding: 6px 15px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  border-radius: 300px;
  border: 1px solid ${theme.colors.gray4};
  p {
    ${theme.textStyles.label1Medium};
    color: ${theme.colors.gray9};
  }
`;

const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;
