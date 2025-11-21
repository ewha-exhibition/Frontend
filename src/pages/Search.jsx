import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventList from "../components/home/EventList.jsx";
import SearchIcon from "../assets/icons/Search.svg?react";
import useSearchExhibitions from "../utils/hooks/useSearchExhibitions";

export default function Search() {
  const location = useLocation();
  const initialKeyword = location.state?.keyword || "";
  const initialResults = location.state?.results || [];

  const [keywordInput, setKeywordInput] = useState(initialKeyword);
  const [keyword, setKeyword] = useState(initialKeyword);
  const { exhibitions, loading, error } = useSearchExhibitions(keyword);
  const [resultList, setResultList] = useState(initialResults);

  useEffect(() => {
    if (keyword && !loading) {
      setResultList(exhibitions);
    }
    // 만약 keyword가 빈 문자열이라면 initialResults 유지 혹은 빈 배열 처리
    if (!keyword && !loading) {
      setResultList(initialResults);
    }
  }, [keyword, loading, exhibitions, initialResults]);

  const handleSearch = () => {
    const trimmed = keywordInput.trim();
    if (trimmed.length === 0) return;
    if (trimmed === keyword) return; // 동일 키워드 재검색 막기
    setKeyword(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Container>
      <SearchBarWrapper>
        <SearchBar>
          <input
            type="text"
            value={keywordInput}
            placeholder="검색어를 입력하세요"
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={handleSearch} width={22} height={22} />
        </SearchBar>
      </SearchBarWrapper>

      {error && <Message>검색 중 오류가 발생했습니다.</Message>}
      {loading && <Message>검색 중...</Message>}
      {!loading && resultList.length === 0 && (
        <Message>검색 결과가 없습니다.</Message>
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
  padding: 0 4px;
  margin-bottom: 16px;
`;

const SearchBar = styled.div`
  height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background: #f5f6f7;
  border-radius: 12px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
  }
`;

const Message = styled.p`
  padding: 16px;
  color: #888;
  font-size: 14px;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
