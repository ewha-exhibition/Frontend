import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import CheeringItem from "../../components/guestBook/CheeringItem";
import ConfirmModal from "../../components/detail/ConfirmModal";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function MyQuestions() {
  const login = useLogin();
  const { fetchData } = useCustomFetch();

  const [pageNow, setPageNow] = useState(0);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const isRequesting = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState(null);

  const {
    data: myQData,
    error,
    loading,
  } = useCustomFetch(`/questions?pageNum=${pageNow}&limit=10`);
  //console.log(items);

  useEffect(() => {
    if (error) {
      isRequesting.current = false;
      return;
    }

    if (!myQData?.data?.previews) return;

    setItems((prev) => {
      const newItems = myQData.data.previews.filter(
        (data) => !prev.some((p) => p.postId === data.postId),
      );
      return [...prev, ...newItems];
    });
    const { pageNum, totalPages } = myQData.data.pageInfo;

    if (pageNum >= totalPages - 1) {
      setHasMore(false);
    }
  }, [myQData, error]);

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

  const handleDeleteConfirm = async () => {
    try {
      await fetchData(`/questions/${targetPostId}`, "DELETE");

      window.location.reload();

      setIsOpen(false);
      setTargetPostId(null);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <Container>
      <Topbar title={"작성한 질문"} icon={null} />

      {login ? (
        <>
          <Content>
            {items?.length === 0 ? (
              <Nothing text={"아직 작성한 질문이 없어요"} />
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
                      exhibitionId={data.exhibitionId}
                      review={data.content}
                      pic={data.imageUrls}
                      mine={true}
                      onRequestDelete={(postId) => {
                        setTargetPostId(postId);
                        setIsOpen(true);
                      }}
                      type={"question"}
                    />
                  </div>
                );
              })
            )}
          </Content>
          <ConfirmModal
            isOpen={isOpen}
            type="question"
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

export default MyQuestions;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
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
