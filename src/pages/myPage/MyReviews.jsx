import styled from "styled-components";
import { useEffect, useState, useRef, useCallbacks } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";
import useLogin from "../../utils/hooks/useLogin";

import Topbar from "../../components/Topbar";
import ReivewItem from "../../components/guestBook/ReviewItem";
import ConfirmModal from "../../components/detail/ConfirmModal";
import KakaoBtn from "../../components/myPage/KakaoBtn";
import Nothing from "../../components/Nothing";

function MyReviews() {
  //const loginId = sessionStorage.getItem("memberId");
  const login = useLogin();
  const [pageNow, setPageNow] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState(null);
  console.log(targetPostId);

  const {
    data: myReviewData,
    error,
    loading,
  } = useCustomFetch(`/reviews?page=${pageNow}&limit=10`);
  console.log("myReviewData:", myReviewData);

  const { fetchData } = useCustomFetch();

  const handleDeleteConfirm = async () => {
    try {
      await fetchData(`/reviews/${targetPostId}`, "DELETE");

      window.location.reload();

      setIsOpen(false);
      setTargetPostId(null);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <Container>
      <Topbar title={"작성한 후기"} icon={null} />

      {login ? (
        <>
          <Content>
            {myReviewData?.data?.items?.length === 0 ? (
              <Nothing text={"아직 작성한 리뷰가 없어요"} />
            ) : (
              myReviewData?.data?.items.map((data) => (
                <ReivewItem
                  key={data.postId}
                  exhibitionId={data.exhibitionId}
                  postId={data.postId}
                  poster={data.posterUrl}
                  title={data.exhibitionName}
                  review={data.content}
                  imageUrls={data.imageUrls}
                  mine={data.mine}
                  onRequestDelete={(postId) => {
                    setTargetPostId(postId);
                    setIsOpen(true);
                  }}
                />
              ))
            )}
          </Content>

          <ConfirmModal
            isOpen={isOpen}
            type="review"
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

export default MyReviews;

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
