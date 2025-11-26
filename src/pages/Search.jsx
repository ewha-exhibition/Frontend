import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventList from "../components/home/EventList.jsx";
import SearchIcon from "../assets/icons/Search.svg?react";
import BackIcon from "../assets/icons/ChevronLeft.svg?react";
import Nothing from "../assets/icons/Nothing.svg?react";
import useSearchExhibitions from "../utils/hooks/useSearchExhibitions";

export default function Search() {
  const location = useLocation();
  const initialKeyword = location.state?.keyword || "";

  const [keywordInput, setKeywordInput] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);
  const { exhibitions, loading } = useSearchExhibitions(keyword);
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    if (keyword && !loading) {
      setResultList(exhibitions);
    }
  }, [keyword, loading]);

  const handleSearch = () => {
    if (keywordInput.trim().length === 0) return;
    setKeyword(keywordInput.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <SearchBarWrapper>
        <BackIcon height={14} width={24} onClick={goBack} />
        <SearchBar>
          <input
            type="text"
            value={keywordInput}
            placeholder="검색어를 입력하세요"
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon
            onClick={handleSearch}
            width={20}
            height={20}
            color="#868B94"
          />
        </SearchBar>
      </SearchBarWrapper>

      {!loading && resultList.length === 0 && (
        <Wrapper>
          <Nothing />
        </Wrapper>
      )}

      <ResultList>
        {resultList.map((item) => (
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
      </ResultList>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  margin-top: 16px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled.div`
  width: 100%;
  height: 35px;
  padding-left: 20px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  background: #f2f3f6;
  border-radius: 20px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    ${({ theme }) => theme.textStyles.label1Medium};
    color: ${({ theme }) => theme.colors.gray10};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 82px 109px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 20px;
`;
