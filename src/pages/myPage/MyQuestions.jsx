import styled from "styled-components";
import { useEffect, useState } from "react";

import useCustomFetch from "../../utils/hooks/useCustomFetch";

import Topbar from "../../components/Topbar";
import CheeringItem from "../../components/guestBook/CheeringItem";
import ConfirmModal from "../../components/detail/ConfirmModal";

function MyQuestions() {
  const {
    data: myQData,
    error,
    loading,
  } = useCustomFetch(`/questions?pageNum=0&limit=10`);
  console.log(myQData?.data);

  const [isOpen, setIsOpen] = useState(false);
  const [targetPostId, setTargetPostId] = useState(null);

  const { fetchData } = useCustomFetch();
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
      <Content>
        {myQData?.data?.previews.map((data) => (
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
        ))}
      </Content>
      <ConfirmModal
        isOpen={isOpen}
        target="question "
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default MyQuestions;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 46px;

  display: flex;
  flex-direction: column;
`;
const Content = styled.div``;
