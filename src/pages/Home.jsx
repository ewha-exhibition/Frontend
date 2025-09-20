import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../style/Theme.jsx";
import Menu from "../assets/icons/Menu.svg";
import Search from "../assets/icons/Search.svg";
import Bookmark from "../assets/icons/Bookmark.svg";

function TopTenItem({ rank, title, bg }) {
  return (
    <ItemCard>
      <PosterImage bg={bg}>
        <LayerOverlay />
        <InfoBar>
          <RankBadge>{rank}</RankBadge>
          <BookmarkStyle>
            <img src={Bookmark} width={16} height={19} />
          </BookmarkStyle>
        </InfoBar>
      </PosterImage>
      <ItemTitle>{title}</ItemTitle>
    </ItemCard>
  );
}
TopTenItem.propTypes = {
  rank: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
};
export default function Home() {
  return (
    <Wrap>
      <TopNavigationBar>
        <Logo>綠’ KNOCK</Logo>
        <img src={Menu} height={24} />
      </TopNavigationBar>
      <SearchBar>
        <p>이화인들의 공연, 전시를 검색해보세요!</p>
        <img src={Search} height={24} />
      </SearchBar>
      <ContentBody>
        <WhiteSection />
        <TopTenHeadline>
          <p>오늘의 TOP 10</p>
        </TopTenHeadline>
        <TopTenList>
          <TopTenItem />
        </TopTenList>
        <EventList />
      </ContentBody>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr; //Nav, Search, ContentBody(Top10, EventList)
  background: #00664f; //디자인 시스템에 정의되지 않음
`;

const TopNavigationBar = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  margin: 0 auto;
  padding: 14px 20px;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: ${theme.colors.white};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.17px; //0.165 to 0.17
`;

const SearchBar = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 92px; //92.19 to 92
  margin: 9px 21px 24px 20px;
  padding: 8px 18px 8px 19px; //18.812 to 19
  border-radius: 20px;
  border: 1.5px solid #74a08f; //디자인 시스템에 정의되지 않음
  p {
    ${theme.textStyles.label2Regular}
    color: ${theme.colors.Primary10};
  }
`;
const ContentBody = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr; //Top10Headline, Top10List, EventList
`;
const TopTenHeadline = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 21px 12px;
  p {
    ${theme.textStyles.headline2Bold}
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

const ItemCard = styled.div`
  width: 107px; // 107.078 to 107
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7.8px; //7.83 to 7.8
`;
const PosterImage = styled.div`
  aspect-ratio: 107 / 151.42;
  border-radius: 3px;
  background-color: ${theme.colors.gray10}; //임시 지정색
  background-image: url(${(props) => props.bg}); //포스터 이미지
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;
const LayerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.23) 12.85%,
    rgba(0, 0, 0, 0) 43.65%
  );
`;

const InfoBar = styled.div`
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

// 순위 표시
const RankBadge = styled.span`
  color: ${theme.colors.white};
  text-shadow: 0 0 10px #000;
  font-family: SUIT;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
`;

const BookmarkStyle = styled.div``;

const ItemTitle = styled.p`
  width: 100%;
  height: 39px; //글자 아래 짤림 37 to 39;
  ${theme.textStyles.titleSemiBold};
  color: ${theme.colors.gray10};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const WhiteSection = styled.div`
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
const EventList = styled.div`
  background: ${theme.colors.white};
`;
