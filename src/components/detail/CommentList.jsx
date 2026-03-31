import styled from "styled-components";
import Nothing from "../../assets/icons/Nothing.svg?react";

export default function CommentList({
  items,
  loading,
  CommentComponent,
  lastElementRef,
  isHost,
  club,
  openModal,
  onReply,
  keyField = "commentId",
}) {
  if (items.length === 0 && !loading) {
    return (
      <CenteredDiv>
        <Nothing />
      </CenteredDiv>
    );
  }

  return items.map((comment, index) => {
    const isLast = index === items.length - 1;
    return (
      <div key={comment[keyField]} ref={isLast ? lastElementRef : null}>
        <CommentComponent
          comment={comment}
          isHost={isHost}
          club={club}
          openModal={openModal}
          onReply={onReply}
        />
      </div>
    );
  });
}

const CenteredDiv = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
