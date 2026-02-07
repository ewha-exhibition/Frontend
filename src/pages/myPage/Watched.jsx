import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import WatchedHis from "../../components/myPage/WatchedHis";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function Watched() {
  const { fetchData } = useCustomFetch();
  const login = useLogin();

  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const isRequesting = useRef(false);

  const {
    data: myWatchedData,
    error,
    loading,
  } = useCustomFetch(`/scraps/viewed?pageNum=${pageNow}&limit=10`);
  console.log(items);

  useEffect(() => {
    if (error) {
      isRequesting.current = false;
      return;
    }
    if (!myWatchedData?.data?.exhibitions) return;

    setItems((prev) => {
      const newItems = myWatchedData.data.exhibitions.filter(
        (data) => !prev.some((p) => p.exhibitionId === data.exhibitionId),
      );
      return [...prev, ...newItems];
    });
    const { pageNum, totalPages } = myWatchedData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [myWatchedData, error]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          isRequesting.current = true;
          setPageNow((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <Container>
      <Topbar title={"관람 내역"} icon={null} />
      {login ? (
        <Content>
          {!loading && items.length === 0 ? (
            <Nothing text={"아직 관람한 공연이 없어요"} />
          ) : (
            items.map((data, index) => {
              const isLast = index === items.length - 1;
              return (
                <div ref={isLast ? lastItemRef : null} key={data.postId}>
                  <WatchedHis
                    key={data.exhibitionId}
                    exhibitionId={data.exhibitionId}
                    title={data.exhibitionName}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    place={data.place}
                    poster={data.posterUrl}
                    haveReview={data.reviewed}
                  />
                </div>
              );
            })
          )}
        </Content>
      ) : (
        <LoginContainer>
          <p>로그인 후 기능을 이용해보세요!</p>
          <KakaoBtn />
        </LoginContainer>
      )}
    </Container>
  );
}

export default Watched;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  padding: 0px 20px 0px 20px;
`;
const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  margin-bottom: 60px;

  text-align: center;
  p {
    font-weight: ${({ theme }) => theme.textStyles.semiBold};
    color: ${({ theme }) => theme.colors.gray7};
  }
`;
