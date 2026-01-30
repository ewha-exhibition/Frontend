import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import CheeringItem from "../../components/guestBook/CheeringItem";
import ConfirmModal from "../../components/detail/ConfirmModal";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function MyExpectations() {
  const login = useLogin();
  const { fetchData } = useCustomFetch();

  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState(null);

  const {
    data: myExData,
    error,
    loading,
  } = useCustomFetch(`/cheers?pageNum=0&limit=10`);

  useEffect(() => {
    if (!myExData?.data?.previews) return;

    setItems((prev) => {
      const newItems = myExData.data.previews.filter(
        (data) => !prev.some((p) => p.postId === data.postId),
      );
      return [...prev, ...newItems];
    });
    const { pageNum, totalPages } = myExData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [myExData]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNow((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleDeleteConfirm = async () => {
    try {
      await fetchData(`/cheers/${targetPostId}`, "DELETE");

      window.location.reload();

      setIsOpen(false);
      setTargetPostId(null);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  console.log(items);

  return (
    <Container>
      <Topbar title={"작성한 기대평"} icon={null} />
      {login ? (
        <>
          <Content>
            {!loading && items.length === 0 ? (
              <Nothing text={"아직 작성한 기대평이 없어요"} />
            ) : (
              items.map((data, index) => {
                const isLast = index === items.length - 1;
                return (
                  <div ref={isLast ? lastItemRef : null} key={data.postId}>
                    <CheeringItem
                      key={data.postId}
                      postId={data.postId}
                      poster={data.posterUrl}
                      title={data.exhibitionName}
                      id={data.exhibitionId}
                      review={data.content}
                      pic={data.imageUrls}
                      mine={true}
                      onRequestDelete={(postId) => {
                        setTargetPostId(postId);
                        setIsOpen(true);
                      }}
                    />
                  </div>
                );
              })
            )}
          </Content>
          <ConfirmModal
            isOpen={isOpen}
            target="question"
            onClose={() => setIsOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      ) : (
        <LoginContainer>
          <p>로그인 후 기능을 이용해보세요!</p>
          <KakaoBtn />
        </LoginContainer>
      )}
    </Container>
  );
}

export default MyExpectations;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
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
