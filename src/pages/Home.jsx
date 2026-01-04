import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuTrigger from "../components/menu/MenuTrigger.jsx";
import TabBar from "../components/home/TabBar.jsx";
import EventList from "../components/home/EventList.jsx";

import SearchIcon from "../assets/icons/Search.svg?react";
import BookmarkIcon from "../assets/icons/Bookmark.svg?react";
import Logo from "../assets/icons/Logo.svg?react";

//API
import useSearchExhibitions from "../utils/hooks/useSearchExhibitions";
import useRankingExhibitions from "../utils/hooks/useRankingExhibitions";
import useLatestExhibitions from "../utils/hooks/useLatestExhibitions";

//top10 컴포넌트
function TopTenItem({ rank, exhibitionId, title, poster, scraped, onClick }) {
  return (
    <Card>
      <Poster poster={poster}>
        <Overlay onClick={onClick} />
        <Bar>
          <Rank>{rank}</Rank>
          <BookmarkIcon width={16} height={19} />
        </Bar>
      </Poster>
      <Title>{title}</Title>
    </Card>
  );
}

export default function Home() {
  //top10
  const {
    list: top10List,
    loading: top10Loading,
    error: top10Error,
  } = useRankingExhibitions();

  //검색
  const navigate = useNavigate(); // 검색 화면 이동
  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState(null);
  const handleSearch = () => {
    if (keywordInput.trim().length === 0) return;

    setKeyword(keywordInput.trim());
    setTimeout(() => {
      navigate("/search", {
        state: {
          keyword: keywordInput.trim(), // 검색어 전달
        },
      });
    }, 200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const { exhibitions, loading: searchLoading } = useSearchExhibitions(keyword);

  //카테고리 별 최신 공연
  const [category, setCategory] = useState("");
  const { exhibitions: latestList, loading: latestLoading } =
    useLatestExhibitions(category, 0, 10);

  return (
    <Container>
      <Header>
        <Logo />
        <MenuTrigger />
      </Header>

      <SearchBarContainer>
        <SearchBar>
          <input
            type="text"
            value={keywordInput}
            placeholder="이화인들의 공연, 전시를 검색해보세요!"
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <StyledSearchIcon onClick={handleSearch} />
        </SearchBar>
      </SearchBarContainer>

      <Content>
        <WhiteBox />

        <TopTenHeadline>
          <h6>오늘의 TOP 10</h6>
          <p>스크랩 수 기준</p>
        </TopTenHeadline>
        <TopTenList>
          {!top10Loading &&
            top10List?.map((item, index) => (
              <TopTenItem
                key={item.exhibitionId}
                title={item.exhibitionName}
                rank={index + 1}
                poster={item.posterUrl}
                onClick={() => navigate(`/detail/${item.exhibitionId}`)}
              />
            ))}
        </TopTenList>

        <EventWrapper>
          <CategoryWrapper>
            {["", "performance", "exhibition", "etc"].map((item, idx) => (
              <CategoryButton
                key={idx}
                selected={category === item}
                onClick={() => setCategory(item)}
              >
                <label>
                  {item === ""
                    ? "전체"
                    : item === "performance"
                      ? "공연"
                      : item === "exhibition"
                        ? "전시"
                        : "기타"}
                </label>
              </CategoryButton>
            ))}
          </CategoryWrapper>

          <EventListWrapper>
            {latestList.map((item) => (
              <EventList
                key={item.exhibitionId}
                title={item.exhibitionName}
                date={item.duration}
                place={item.place}
                poster={item.posterUrl}
                onGoing={item.open}
                scraped={item.scrap}
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
  position: relative;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;

  /* 헤더가 fixed(46px)라서 그만큼 위를 비워줘야 함 */
  padding-top: 46px;

  background: linear-gradient(
    to bottom,
    #00664f 0%,
    #00664f 250px,
    #ffffff 250px,
    #ffffff 100%
  );
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(540px, 100vw);
  background: #00664f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 14px 20px;
  z-index: 100;
`;

const SearchBarContainer = styled.div`
  padding: 9px 20px 24px 20px;
`;
const StyledSearchIcon = styled(SearchIcon)`
  width: 24px;
  height: 24px;
  color: #dbf3ec;
`;
//padding: 18.812 to 19
//gap: 92.19 to 92
const SearchBar = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 18px 8px 19px;
  border-radius: 20px;
  border: 1.5px solid #74a08f;

  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;

    ${({ theme }) => theme.textStyles.label2Regular};
    color: ${({ theme }) => theme.colors.Primary10};

    &::placeholder {
      ${({ theme }) => theme.textStyles.label2Regular};
      color: ${({ theme }) => theme.colors.Primary10};
    }
  }
`;

//NOTE: Content - Top10, EventList
const Content = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;
const TopTenHeadline = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  h6 {
    ${({ theme }) => theme.textStyles.titleSemiBold};
    color: ${({ theme }) => theme.colors.white};
  }
  p {
    ${({ theme }) => theme.textStyles.label2Medium};
    color: ${({ theme }) => theme.colors.gray5};
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

const Card = styled.div`
  flex: 0 0 auto;
  width: 107px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7.8px;
`;
const Poster = styled.div`
  aspect-ratio: 107 / 151.42;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray10};
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
  color: ${({ theme }) => theme.colors.white};
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
  ${({ theme }) => theme.textStyles.titleSemiBold};
  color: ${({ theme }) => theme.colors.gray10};
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
  background: ${({ theme }) => theme.colors.white};
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
  margin-bottom: 8px;
  z-index: 1;
  width: 100%;
`;
const CategoryButton = styled.div`
  flex: 1;
  display: flex;
  width: 78px;
  padding: 6px 15px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  border-radius: 300px;

  border: 1.2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.Primary60 : theme.colors.gray4};

  background: ${({ selected, theme }) =>
    selected ? theme.colors.Primary5 : "transparent"};

  cursor: pointer;
  transition: all 0.2s ease;

  label {
    ${({ theme }) => theme.textStyles.label1Medium};
    color: ${({ selected, theme }) =>
      selected ? theme.colors.Primary60 : theme.colors.gray9};
  }
`;

const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px;
`;
