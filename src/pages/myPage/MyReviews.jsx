import styled from "styled-components";
import { useEffect, useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import ReivewItem from "../../components/guestBook/ReviewItem";
import ConfirmModal from "../../components/detail/ConfirmModal";

function MyReviews() {
  //const loginId = sessionStorage.getItem("memberId");
  const [pageNow, setPageNow] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState(null);

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
      <Topbar title={"작성한 후기"} icon={"none"} />
      <Content>
        {myReviewData?.data?.items.map((data) => (
          <ReivewItem
            key={data.postId}
            exhibitionId={data.exhibitionId}
            postId={data.postId}
            poster={data.posterUrl}
            title={data.exhibitionName}
            review={data.content}
            pic={data.images}
            mine={data.mine}
            onRequestDelete={(postId) => {
              setTargetPostId(postId);
              setIsOpen(true);
            }}
          />
        ))}
      </Content>

      <ConfirmModal
        isOpen={isOpen}
        target="review"
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default MyReviews;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
